import img1 from '../assets/2007/conf2007.jpg'

import img2 from '../assets/2009/1-DSC_8022.jfif'
import img3 from '../assets/2009/1-DSC_8040.jfif'
import img4 from '../assets/2009/1-DSC_8086.jfif'
import img5 from '../assets/2009/1-DSC_8108.jfif'
import img6 from '../assets/2009/1-DSC_8115.jfif'

import img7 from '../assets/2011/1-_DSC2665.JPG'
import img8 from '../assets/2011/1-_DSC2666.JPG'
import img9 from '../assets/2011/1-_DSC2683.JPG'
import img10 from '../assets/2011/1-_DSC2689.JPG'
import img11 from '../assets/2011/1-_DSC2703.JPG'
import img12 from '../assets/2011/1-_DSC2740.JPG'
import img13 from '../assets/2011/1-_DSC2742.JPG'
import img14 from '../assets/2011/1-_DSC2748.JPG'


export const Conference = [
    {
        pathName: 'Історія',
        years: [
            {   id:'conference-first',
                name: 'I Конференція (2007)',
                content: [
                    {
                        title: 'I МІЖНАРОДНА НАУКОВО ПРАКТИЧНА КОНФЕРЕНЦІЯ\n28-31 травня 2007 року',
                        desc: 'ТЕОРЕТИЧНІ І ЕКСПЕРИМЕНТАЛЬНІ ДОСЛІДЖЕННЯ В ТЕХНОЛОГІЯХ СУЧАСНОГО МАТЕРІАЛОЗНАВСТВА ТА МАШИНОБУДУВАННЯ',
                        img: [img1],
                    },
                ],
            },
            {
                id:'conference-second',
                name: 'II Конференція (2009)',
                content: [
                    {
                        title: 'II МІЖНАРОДНА НАУКОВО ПРАКТИЧНА КОНФЕРЕНЦІЯ',
                        desc: '1-6 червня 2009 року',
                        img: [img2, img3, img4, img5 ,img6],
                    },
                ],
            },
            {
                id:'conference-three',
                name: 'III Конференція (2011)',
                content: [
                    {
                        title: 'III МІЖНАРОДНА НАУКОВО ПРАКТИЧНА КОНФЕРЕНЦІЯ',
                        desc: '6-10 червня 2011 року',
                        img: [img7, img8, img9, img10 ,img11 , img12, img13 ,img14],
                    },
                ],
            },{
                id:'conference-four',
                name: 'IV Конференція (2013)',
                content: [
                    {
                        title: 'IV МІЖНАРОДНА НАУКОВО ПРАКТИЧНА КОНФЕРЕНЦІЯ',
                        desc: '3-7 червня 2013 року',
                        img: [img7, img8, img9, img10 ,img11 , img12, img13 ,img14],
                    },
                ],
            },
        ],
    },
];
