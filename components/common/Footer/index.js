import Image from 'next/image'
import s from './Footer.module.css'
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={s.wrapper}>
      <div className="lg:col-span-2 col-span-7">
        <a className={s.logo}>
          <Image src="/logo.png" height={50} width={50} layout="intrinsic" alt='logo' />
          <div className='mt-5'>
            <h1 className={s.title}>Funny movies</h1>
          </div>
        </a>
      </div>
      <div className="lg:col-span-2 col-span-3">
        <div className={s.title}>
          Products
        </div>
        <div className={s.products}>
          {products.map((item) => (
            <div key={`products_${item.id}`}>
              <span className={s.menu} >
                <Link href={item.href} >
                  <a target={item.isOpenNewWindow ? "_blank" : ""}>
                    {item.title}
                  </a>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2 col-span-4">
        <div className={s.title}>
          Support
        </div>
        <div className={s.products}>
          {supports.map((item) => (
            <div key={`supports_${item.id}`}>
              <span className={s.menu} >
                <Link href={item.href}>
                  <a target="_blank">
                    {item.title}
                  </a>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2 col-span-4">
        <div className={s.title}>
          Tools
        </div>
        <div className={s.products}>
          {tools.map((item) => (
            <div key={`supports_${item.id}`}>
              <span className={s.menu} >
                <Link href={item.href}>
                  <a target="_blank">
                    {item.title}
                  </a>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='lg:col-span-8 col-span-7 text-center'>
        Copyright © 2023 - All Rights Reserved.
      </div>
    </footer>
  )
}

const products = [
];

const supports = [
];

const tools = [
];
