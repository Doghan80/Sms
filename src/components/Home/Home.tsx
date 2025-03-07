import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const polarArea = {
    labels: ['Boys', 'Girls', 'Drops'],
    datasets: [
      {
        data: [400, 400, 200],
        backgroundColor: ['#001d3d', '#659AC6', '#0F22A2'],
        borderColor: ['#001d3d', '#659AC6', '#0F22A2'],
        borderWidth: 1,
      },
    ],
  };

  const polarAreaOptions = {
    responsive: true,
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const total = tooltipItem.dataset.data.reduce((a: number, b: number, c: number) => a + b + c, 0);
            const percentage = ((tooltipItem.raw / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
          },
        },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="w-full mt-9">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 px-8 ">
        <div className="w-full md:w-[400px] bg-background dark:bg-mini dark:text-background rounded-lg h-[100px] flex flex-row items-center justify-start  text-xl font-semibold p-5 shadow-lg hover:shadow-xl transition-all duration-300 gap-10">
          <FaUserGraduate className="text-blue-500 text-3xl ml-5" />
           <div className='flex flex-col'>
         <span className="text-md font-bold">2000</span>
          <span className="text-sm font-semibold text-hover dark:text-background">Total Students</span>
          </div>
        </div>

        <div className=" w-full md:w-[400px] bg-background dark:bg-mini dark:text-background rounded-lg h-[100px] flex flex-row items-center justify-start text-xl font-semibold p-5 shadow-lg hover:shadow-xl transition-all duration-300 gap-10">
          <FaChalkboardTeacher className="text-green-500 text-3xl mb-3" />
          <div className="flex flex-col">
          <span className="text-md font-bold">120</span>
          <span className="text-sm font-semibold text-hover dark:text-background">Teachers</span>
          </div>
        </div>

        <div className="w-full md:w-[400px] bg-background dark:bg-mini dark:text-background rounded-lg h-[100px] flex flex-row items-center justify-start text-xl font-semibold p-5 shadow-lg hover:shadow-xl transition-all duration-300 gap-10">
          <FaMoneyBillWave className="text-yellow-500 text-3xl mb-3" />
          <div className="flex flex-col">
          <span className="text-md font-bold">$1000</span>
          <span className="text-sm font-semibold text-hover dark:text-background">Yearly Budget</span>
          </div>
        </div>
      </div>

      <div className='w-1/4 mt-8 px-8 '>
          <Doughnut  data={polarArea} options={polarAreaOptions}/>
          
          </div>
    </div>
  );
};

export default Home;
