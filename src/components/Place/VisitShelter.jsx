import pb from '@/api/pocketbase';
import { useEffect, useState } from 'react';
import PlaceList from './PlaceList';

function VisitShelter() {
  const [placeLists, setPlaceLists] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const renderPlaceList = await pb.collection('place').getFullList();
        setPlaceLists(renderPlaceList);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchPlaces();
  }, []);
  return (
    <>
      <section className="my-0 mx-[20px]">
        <h2 className="font-bold mt-[14%] mb-[3%] mx-0 text-sm pet-m:text-lg pet-l:text-xl transition-[0.3s]">
          보호소 사이트 방문하기
        </h2>
        <ul>
          {placeLists?.map((place, i) => (
            <PlaceList place={place} key={`${place}_${i}`} />
          ))}
        </ul>
      </section>
    </>
  );
}
export default VisitShelter;
