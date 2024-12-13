'use client';

import { useRegistrations } from '@/hooks/platformrecentActivity';

const RegistrationList = () => {
  const { data, loading, error } = useRegistrations();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.registrations.map((registration) => (
        <li key={registration.userId}>
          {registration.user} - {registration.blockTimestamp}
        </li>
      ))}
    </ul>
  );
};

export default RegistrationList;
