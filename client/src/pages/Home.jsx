import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try{
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
        fetchSaleListings();
      }catch(err) {
        console.log(err);
      }
    }
    const fetchRentListings = async() => {
      try{
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
      }catch(err){
        console.log(err);
      }
    }

    const fetchSaleListings = async () => {
      try{
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      }catch(err){
        console.log(err);
      }
    }

    fetchOfferListings();
  },[]);

  console.log(offerListings);
  console.log(rentListings);
  console.log(saleListings);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span><br/>pleace with ease
        </h1>
        <div className='text-gray-400 text-sm'>
          Premium Estate will help ypu find your home fast, easy and comfortable.<br/>
          Our expert support are always available.
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>Let's get started...</Link>
      </div>
      {/* swiper */}
      <Swiper navigation={true} modules={[Navigation]}>
        {
          offerListings && offerListings.length > 0 && offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover'}} className='h-[500px]'></div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      {/* recent listing result for offer, rent and sale */}
      <div className='max-w-screen-2xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
        offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:underline'>
                Show more offers
              </Link>
            </div>
            <div className=' flex flex-wrap gap-4'>
              {
                offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
          </div>
        )
        }
        {
        rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline'>
                Show more offers
              </Link>
            </div>
            <div className=' flex flex-wrap gap-4'>
              {
                rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
          </div>
        )
        }
        {
        saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link to={'/search?type=sale'} className='text-sm text-blue-800 hover:underline'>
                Show more offers
              </Link>
            </div>
            <div className=' flex flex-wrap gap-4'>
              {
                saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}
