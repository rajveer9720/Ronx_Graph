import cn from 'classnames';
import { PersonCircle, Recycle } from 'react-bootstrap-icons';
import { Star } from '@/components/icons/star';
import { StarFill } from '@/components/icons/star-fill';
import { useState } from 'react';

interface CoinCardDetailsProps {
  details: {
    id: number;
    title: string;
    price: string;
    stared: boolean;
    hourPrice: {
      id: string;
      title: string;
      price: string;
    }[];
    priceUp: boolean;
    upPrice: string;
    downPrice: string;
  };
}

export default function CoinCard({ details }: CoinCardDetailsProps) {
  const [bookmark, setBookmark] = useState(false);

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-gray-100 dark:border-gray-700 dark:bg-light-dark dark:shadow-card">
      <div className="p-3 pb-4">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm font-medium uppercase">
            <h2 className="mb-1 text-[#111827] dark:text-white">
              {details.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{details.price}</p>
          </div>
          <button onClick={() => setBookmark(!bookmark)} style={{ display: 'flex', alignItems: 'center' }}>
            {bookmark ? (
              <StarFill className="h-4 w-4 text-[#FB923C]" style={{ marginRight: '0.25rem' }} />
            ) : (
              <Star className="h-4 w-4 text-brand dark:text-gray-400" style={{ marginRight: '0.25rem' }} />
            )}
            <span style={{ marginLeft: '0.25rem' }}>{details.price}</span>
          </button>
        </div>
        <div className="flex justify-center gap-4">
      <div style={circleStyle}></div>
      <div style={circleStyle}></div>
      <div style={circleStyle}></div>
    </div>
        <div className="flex flex-wrap gap-4">
          {details.hourPrice.map((item) => (
            <div key={`price-high-low-${item.id}`} className="text-xs font-normal uppercase">
              <p className="text-gray-500 dark:text-gray-400">{item.title}</p>
              <p className="text-[#111827] dark:text-white">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <p className={cn('flex items-center justify-center gap-2 border-t border-[#E2E8F0] p-3 text-sm font-normal dark:border-light-dark')}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* Button with Person icon and number */}
          <button onClick={() => setBookmark(!bookmark)} style={{ display: 'flex', alignItems: 'center' }}>
            <PersonCircle className="h-4 w-4 text-primary" style={{ marginRight: '0.25rem' }} />
            <span style={{ marginLeft: '0.25rem' }}>5</span>
          </button>

          {/* Button with Recycle icon and number */}
          <button onClick={() => setBookmark(!bookmark)} style={{ display: 'flex', alignItems: 'center' }}>
            <Recycle className="h-4 w-4 text-secondary" style={{ marginRight: '0.25rem' }} />
            <span style={{ marginLeft: '0.25rem' }}>10</span>
          </button>
        </div>
      </p>
    </div>
  );

}
const circleStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};
