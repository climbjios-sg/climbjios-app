import React, { useState } from 'react';

import UserImage1 from '../images//user-1.jpg';
import UserImage2 from '../images//user-2.jpg';
import UserImage3 from '../images//user-3.jpg';
import UserImage4 from '../images//user-4.jpg';
import UserImage5 from '../images//user-5.jpg';
import UserImage6 from '../images//user-6.jpg';
import UserImage7 from '../images//user-7.jpg';
import UserImage8 from '../images//user-8.jpg';
import UserImage9 from '../images//user-9.jpg';
import UserImage10 from '../images//user-10.jpg';
import UserImage11 from '../images//user-11.jpg';
import UserImage12 from '../images//user-12.jpg';
import UserImage13 from '../images//user-13.jpg';
import UserImage14 from '../images//user-14.jpg';
import UserImage15 from '../images//user-15.jpg';
import UserImage16 from '../images//user-16.jpg';
import UserImage17 from '../images//user-17.jpg';
import UserImage18 from '../images//user-18.jpg';
import UserImage19 from '../images//user-19.jpg';
import UserImage20 from '../images//user-20.jpg';

function TestimonialsCircles() {

  const [commentOn, setCommentOn] = useState(false);
  const [active, setActive] = useState(0);
  const [items] = useState([
    {
      image: UserImage1,
      size: '48', // image width / height
      style: { maxWidth: '7.08%', top: '29%', left: '2%' }, // image absolute  positioning
      comment: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. 🙌', // comment to be displayed on hover,
      name: 'Elian Whitney',
    },
    {
      image: UserImage2,
      size: '36',
      style: { maxWidth: '5.31%', top: '60%', left: '2%' },
      comment: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      name: 'Justice Porter',
    },
    {
      image: UserImage3,
      size: '72',
      style: { maxWidth: '10.62%', top: '43%', left: '13%' },
      comment: 'When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream.',
      name: 'Leonel Roy',
    },
    {
      image: UserImage4,
      size: '56',
      style: { maxWidth: '8.26%', top: '75%', left: '14%' },
      comment: 'O my friend -- but it is too much for my strength -- I sink under the weight of the splendour.',
      name: 'Daniel Wolf',
    },
    {
      image: UserImage5,
      size: '64',
      style: { maxWidth: '9.44%', top: '11%', left: '15%' },
      comment: 'I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.',
      name: 'Seamus Miranda',
    },
    {
      image: UserImage6,
      size: '80',
      style: { maxWidth: '11.8%', top: '32%', left: '30%' },
      comment: 'I am so hClimbJios, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.',
      name: 'Fiona Schultz',
    },
    {
      image: UserImage7,
      size: '50',
      style: { maxWidth: '7.37%', top: '65%', left: '30%' },
      comment: 'I should be incapable of drawing a single stroke at the present moment.',
      name: 'Monica Evans',
    },
    {
      image: UserImage8,
      size: '36',
      style: { maxWidth: '5.31%', top: '6%', left: '33%' },
      comment: 'I feel that I never was a greater artist than now.',
      name: 'Jakayla Dunlap',
    },
    {
      image: UserImage9,
      size: '44',
      style: { maxWidth: '6.49%', top: '77%', left: '44%' },
      comment: 'When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees.',
      name: 'Mattie Sharp',
    },
    {
      image: UserImage10,
      size: '64',
      style: { maxWidth: '9.44%', top: '48%', left: '46%' },
      comment: 'I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now.',
      name: 'Jazmyn Gaines',
    },
    {
      image: UserImage11,
      size: '72',
      style: { maxWidth: '10.62%', top: '16%', left: '46%' },
      comment: 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.',
      name: 'Patrick Christensen',
    },
    {
      image: UserImage12,
      size: '64',
      style: { maxWidth: '9.44%', top: '65%', left: '58%' },
      comment: 'His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.',
      name: 'Mike Johnson',
    },
    {
      image: UserImage13,
      size: '80',
      style: { maxWidth: '11.8%', top: '32%', left: '62%' },
      comment: 'His room, a proper human room although a little too small, lay peacefully between its four familiar walls.',
      name: 'Lyla Griffith',
    },
    {
      image: UserImage14,
      size: '48',
      style: { maxWidth: '7.08%', top: '6%', left: '63%' },
      comment: 'Drops of rain could be heard hitting the pane, which made him feel quite sad.',
      name: 'Damien Mclaughlin',
    },
    {
      image: UserImage15,
      size: '24',
      style: { maxWidth: '3.54%', top: '93%', left: '65%' },
      comment: 'He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better.',
      name: 'Perry Mason',
    },
    {
      image: UserImage16,
      size: '36',
      style: { maxWidth: '5.31%', top: '86%', left: '76%' },
      comment: 'For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. I ought to just try that with my boss.',
      name: 'Briana Friedman',
    },
    {
      image: UserImage17,
      size: '44',
      style: { maxWidth: '6.49%', top: '59%', left: '76%' },
      comment: 'I would get kicked out on the spot.But who knows, maybe that would be the best thing for me.',
      name: 'Manuel Kirk',
    },
    {
      image: UserImage18,
      size: '72',
      style: { maxWidth: '10.62%', top: '14%', left: '78%' },
      comment: 'And it is a funny sort of business to be sitting up there at your desk, talking down at your subordinates from up there.',
      name: 'Cedric Reynolds',
    },
    {
      image: UserImage19,
      size: '64',
      style: { maxWidth: '9.44%', top: '40%', left: '89%' },
      comment: 'I ought to just try that with my boss.',
      name: 'Gracelyn Wilcox',
    },
    {
      image: UserImage20,
      size: '24',
      style: { maxWidth: '3.54%', top: '74%', left: '91%' },
      comment: 'It was half past six and the hands were quietly moving forwards, it was even later than half past.',
      name: 'Jamir Henson',
    },
  ]);

  return (
    <section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">

          <div className="relative">

            {/* Background image */}
            <svg className="mx-auto" viewBox="0 0 678 346" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="39.386%" id="circle_b">
                  <stop stopColor="#3ABAB4" offset="0%" />
                  <stop stopColor="#3ABAB4" stopOpacity="0" offset="100%" />
                </radialGradient>
                <linearGradient x1="50%" y1="50%" x2="50%" y2="89.386%" id="circle_a">
                  <stop stopColor="#2E2E33" offset="0%" />
                  <stop stopColor="#2E2E33" stopOpacity="0" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <circle className="opacity-10 dark:opacity-100" fill="url(#circle_a)" opacity=".32" cx="339" cy="173" r="173" />
                <circle fill="url(#circle_b)" opacity=".32" cx="339" cy="173" r="140" />
              </g>
            </svg>

            {/* People pics */}
            {items.map((item, index) => (
                <img key={index} className="absolute rounded-full z-10 animate-float" style={item.style} src={item.image} width={item.size} height={item.size} alt={`User ${index + 1}`} onMouseEnter={() => { setActive(index); setCommentOn(true); }} onMouseLeave={() => setCommentOn(false)} />
            ))}

            {/* Comment box */}
            <div className={`opacity-0 transition duration-150 ease-in-out absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6 max-w-xs w-full p-3 bg-white dark:bg-gray-800 text-center shadow-2xl z-20 pointer-events-none ${commentOn && 'opacity-100'}`}>
              <div className="text-gray-600 dark:text-gray-400 mb-1">{items[active].comment}</div>
              <div className="text-sm font-bold text-gray-800 dark:text-gray-100">{items[active].name}</div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default TestimonialsCircles;