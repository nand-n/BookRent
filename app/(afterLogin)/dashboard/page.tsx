'use client';

import EarningSummaryChart from './_componsets/earningSummaryChart';
import AvailableBooksChart from './_componsets/availableBooksChart';
import ThisMonthStatistics from './_componsets/thisMonthStatistics';
import LiveBookStatus from './_componsets/liveBookStatus';

const Home = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-12 w-full items-center gap-4 my-4">
        <div className="col-span-4 col-start-1 bg-white w-full h-full  space-y-4  rounded-2xl">
          <div className="grid gap-4 shadow-lg roudned space-y-8 m-4">
            <ThisMonthStatistics />
            <AvailableBooksChart />
          </div>
        </div>

        <div className="col-span-8 col-start-5 w-full h-full space-y-12">
          <div className="grid  items-center m-4   space-y-4  ">
            <div className=" bg-white mb-8 rounded-2xl shadow-lg">
              <LiveBookStatus />
            </div>

            <div className=" bg-white rounded-2xl shadow-lg py-4">
              <EarningSummaryChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
