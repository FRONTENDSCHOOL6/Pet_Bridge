import FindShelter from '../components/Place/FindShelter';
import RecommendShelter from '../components/Place/RecommendShelter';
import VisitShelter from '../components/Place/VisitShelter';

function Place() {
  return (
    <>
      <article className="max-w-screen-pet-l mx-auto my-0 relative bg-pet-bg">
        <FindShelter />
        <RecommendShelter />
        <VisitShelter />
      </article>
    </>
  );
}

export default Place;
