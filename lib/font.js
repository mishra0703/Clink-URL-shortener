import { Poppins , Edu_NSW_ACT_Foundation } from 'next/font/google'

export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
})


export const eduCursive = Edu_NSW_ACT_Foundation({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-edu-cursive',
})
