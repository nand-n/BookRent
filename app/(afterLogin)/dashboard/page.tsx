'use client';

import EarningSummaryChart from './_componsets/earningSummaryChart';
import AvailableBooksChart from './_componsets/availableBooksChart';
import ThisMonthStatistics from './_componsets/thisMonthStatistics';
import LiveBookStatus from './_componsets/liveBookStatus';

const Home = () => {
  return (
    <div className="p-2 md:p-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 w-full items-center gap-4 my-4">
        {/* Left Column */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-white w-full h-full space-y-4 rounded-2xl">
          <div className="grid gap-4 shadow-lg rounded space-y-8 m-1  md:m-4">
            <ThisMonthStatistics />
            <AvailableBooksChart />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-8 w-full h-full space-y-4 rounded-2xl">
          <div className="grid gap-4 shadow-lg rounded space-y-8 m-1  md:m-4">
            {/* Live Book Status */}
            <div className="bg-white mb-8 rounded-2xl shadow-lg w-full overflow-x-auto">
              <LiveBookStatus />
            </div>

            {/* Earning Summary Chart */}
            <div className="bg-white rounded-2xl shadow-lg py-4 w-full overflow-x-auto">
              <EarningSummaryChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
