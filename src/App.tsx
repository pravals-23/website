import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RegistrationCountdown from '@/components/RegistrationCountdown';
import TournamentStats from '@/components/TournamentStats';
import TournamentDetails from '@/components/TournamentDetails';
import VenueSection from '@/components/VenueSection';
import PrizePool from '@/components/PrizePool';
import TournamentFlow from '@/components/TournamentFlow';
import RegistrationForm from '@/components/RegistrationForm';
import SocialSection from '@/components/SocialSection';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <RegistrationCountdown />
        <TournamentStats />
        <TournamentDetails />
        <VenueSection />
        <PrizePool />
        <TournamentFlow />
        <RegistrationForm />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
