import { useParams } from 'react-router-dom';



export default function ActivityPage() {
  const { id } = useParams();
  
  return (
    <div>
        <h1> я активность {id}</h1>
    </div>
  );
}