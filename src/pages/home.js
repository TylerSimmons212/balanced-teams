import protectRoute from '../utils/protectRoute';
import TeamGenerator from '../components/TeamGenerator';
import NavBar from '@/components/NavBar';

const Home = () => {

  return (
    <div>
      <NavBar />
      <TeamGenerator />
    </div>
  );
};

export default protectRoute(Home);
