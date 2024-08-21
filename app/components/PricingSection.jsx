import React from 'react';
import PricingCard from './PricingCard';

const PricingSection = () => (
  <div className="container d-flex justify-content-center">

    <div className="mb-3 text-center d-flex gap-5">

      <PricingCard
        title="Standard"
        price="500"
        features={[
          '500+ hands-on courses',
          '12 months of access',
          'Completion certificates',
          'Easy access to new courses',
          'AI-Powered Features'
        ]}
        isPopular
        discount={59}
      />
      <PricingCard
        title="Premium"
        price="800"
        features={[
          '700+ real-world projects',
          'Personalized Paths',
          '3 Mock Interviews per month',
          '800+ hands-on courses',
          '12 months of access',
          'Completion certificates',
          'Easy access to new courses',
          'AI-Powered Features'
        ]}
        isPopular
        discount={58}
      />
      <PricingCard
        title="Premium Plus"
        price="1000"
        features={[
          'AI Cloud Labs',
          '7 Mock Interviews per month',
          '280 real-world projects',
          'Personalized Paths',
          '800+ hands-on courses',
          '12 months of access',
          'Completion certificates',
          'Easy access to new courses',
          'AI-Powered Features'
        ]}
        isBestForLearning
        discount={58}
      />
    </div>
  </div>
);

export default PricingSection;