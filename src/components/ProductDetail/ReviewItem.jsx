import useProductItem from '@/utils/useProductItem';
import { useParams } from 'react-router-dom';
import getPbImageURL from '@/utils/getPbImageUrl';
import { useState, useEffect } from 'react';
import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import profileImgDefault from '/assets/imgs/profileImg_default.png';
import toast from 'react-hot-toast';

function ReviewItem() {
  const { user } = useAuth();
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [lastReviewId, setLastReviewId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    // * 리뷰 연결
    const fetchReviews = async () => {
      try {
        const reviewsData = await pb
          .collection('reviews')
          .getFullList({ expand: 'users' });
        const relatedReviews = reviewsData.filter(
          (review) => review.product_title === data.title
        );
        const latestReviewId =
          relatedReviews.length > 0
            ? relatedReviews[relatedReviews.length - 1].id
            : null;

        if (latestReviewId !== lastReviewId) {
          setLastReviewId(latestReviewId);
          setReviews(relatedReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    };
    fetchReviews();
  }, [data.title, lastReviewId]);

  // * 삭제 기능
  const handleCommentDelete = async (commentId) => {
    try {
      await pb.collection('reviews').delete(commentId);
      // 업데이트된 리뷰 목록 다시 가져오기
      const updatedReviewsData = await pb
        .collection('reviews')
        .getFullList({ expand: 'users' });
      const relatedReviews = updatedReviewsData.filter(
        (review) => review.product_title === data.title
      );
      setReviews(relatedReviews);
      toast('댓글이 삭제되었습니다.', {
        position: 'top-right',
        icon: '🗞',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  };

  // * 댓글 저장
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast('로그인이 필요합니다.', {
        position: 'top-right',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }
    if (!comment || editingCommentId !== null) {
      toast('글을 작성해주세요.', {
        position: 'top-right',
        icon: '✒',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }

    // 리뷰 데이터 포켓베이스에 저장
    try {
      const currentDate = new Date();
      const newReview = await pb.collection('reviews').create({
        name: user.name,
        contents: comment,
        product_title: data.title,
        postdate: currentDate,
        users: user.id,
      });
      const expandedNewReview = await pb
        .collection('reviews')
        .getOne(newReview.id, { expand: 'users' });
      // 사용자 이미지까지 가져오기 위해 데이터 확장
      setReviews((prevReviews) => [...prevReviews, expandedNewReview]);
      setComment('');
      toast('작성 되었습니다.', {
        position: 'top-right',
        icon: '🖋',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error('Error writing review: ', error);
    }
  };

  // * 리뷰 수정
  const handleCommentEdit = (commentId) => {
    setEditingCommentId(commentId);
    setEditingContent(
      reviews.find((review) => review.id === commentId).contents
    );
  };
  const handleEditChange = (e) => {
    setEditingContent(e.target.value);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await pb
        .collection('reviews')
        .update(editingCommentId, { contents: editingContent });

      // 업데이트된 리뷰 목록 가져오기
      const updatedReviewsData = await pb
        .collection('reviews')
        .getFullList({ expand: 'users' });
      const relatedReviews = updatedReviewsData.filter(
        (review) => review.product_title === data.title
      );
      setReviews(relatedReviews);

      // 입력창 초기화
      setEditingCommentId(null);
      setEditingContent('');
      toast('댓글이 수정되었습니다.', {
        position: 'top-right',
        icon: '💬',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error('Error editing comment: ', error);
    }
  };

  return (
    <>
      <form
        id="reviews"
        className="pt-2 pb-8 flex w-full"
        onSubmit={editingCommentId ? handleEditSubmit : handleCommentSubmit}
      >
        <div className='border-primary w-full flex border-2 rounded-xl'>
          <textarea
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="작성하실 리뷰를 적어주세요"
          className="w-full h-9 rounded-lg pl-2 py-2 resize-none overflow-hidden"
        />
        <button
          type="submit"
          onClick={handleCommentSubmit}
          className="border-primary px-3 bg-primary w-16 h-9 rounded-lg"
        >
          작성
        </button>
        </div>
        
      </form>
      {reviews
        .slice()
        .reverse()
        .map((review, index) => {
          const reviewDate = new Date(review.postdate);
          const formattedDate = reviewDate
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\. /g, '.');
          const commentUser = review.expand && review.expand.users;
          return (
            <div
              key={index}
              className="bg-pet-bg h-auto flex-shrink-0 rounded-2xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] mb-6"
            >
              <div className="py-4 px-6">
                <div className="flex text-xl items-center">
                  {commentUser && commentUser.avatar ? (
                    <img
                      src={getPbImageURL(commentUser, 'avatar')}
                      alt={commentUser.name}
                      className="w-11 h-11 rounded-lg"
                    />
                  ) : (
                    <img
                      src={profileImgDefault}
                      alt="프로필 이미지"
                      className="w-11 h-11 rounded-lg"
                    />
                  )}
                  <p className="pl-2 font-semibold">{review.name}</p>
                </div>
                <p className="text-sm font-semibold mb-5">{formattedDate}</p>
                {editingCommentId === review.id ? (
                  <>
                    <textarea
                      type="text"
                      value={editingContent}
                      onChange={handleEditChange}
                      className="w-full"
                    />
                    <button
                      className="bg-primary w-14 h-9 rounded-xl"
                      onClick={handleEditSubmit}
                    >
                      완료
                    </button>
                  </>
                ) : (
                  <div>
                    <p className="text-xl">{review.contents}</p>
                    <div className="flex justify-end mt-3 gap-3">
                      {user?.name === review?.name && (
                        <>
                          <button
                            className="bg-primary w-14 h-9 rounded-xl"
                            onClick={() => handleCommentEdit(review.id)}
                          >
                            수정
                          </button>
                          <button
                            className="bg-primary w-14 h-9 rounded-xl"
                            onClick={() => handleCommentDelete(review.id)}
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
}

export default ReviewItem;