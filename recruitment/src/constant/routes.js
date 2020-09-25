import Recrutment from '../container/Recrutment';
import Candidate from '../container/Candidate';
import RecrutmentDetail from '../components/RecrutmentDetail';
import CandidateDetail from '../components/CandidateDetail';
import CustomeJob from '../components/CustomeJob';
import CustomeCandidate from '../components/CustomeCandidate';
import Login from '../container/Login';
import SignUp from '../container/SignUp/SignUp';

export const routes = [
  {
    path: '/',
    exact: true,
    name: 'wrapper wrapper-homepage',
    component: Recrutment,
  },
  {
    path: '/recruitment',
    exact: true,
    name: 'recruitment-list',
    component: Recrutment,
  },
  {
    path: '/recruitment/:idRecruitment',
    exact: true,
    name: 'recruitment-list',
    component: RecrutmentDetail,
  },
  {
    path: '/candidate',
    exact: true,
    name: 'Candidate-list',
    component: Candidate,
  },
  {
    path: '/candidate/:idCandidate',
    exact: true,
    name: 'Candidate-list',
    component: CandidateDetail,
  },
  {
    path: '/add-job',
    exact: true,
    name: 'CustomeJob',
    component: CustomeJob,
  },
  {
    path: '/update-job/:idJob',
    exact: true,
    name: 'CustomeJob',
    component: CustomeJob,
  },
  {
    path: '/add-candidate',
    exact: true,
    name: 'AddCandidate',
    component: CustomeCandidate,
  },
  {
    path: '/edit-candidate/:idCandidate',
    exact: true,
    name: 'EditCandidate',
    component: CustomeCandidate,
  },
  {
    path: '/login',
    exact: true,
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    exact: true,
    name: 'SignUp',
    component: SignUp,
  },
];
