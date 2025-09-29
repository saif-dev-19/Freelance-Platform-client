import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Heart } from 'lucide-react';

import ServiceImages from './ServiceImages';
import { useNavigate, useParams } from 'react-router';
import apiClient from '../../api_services/api-Client';


const ServiceDetails = () =>{
    const {serviceID} = useParams();
    const [service, setService] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true);
        apiClient.get(`/services/${serviceID}/`)
        .then((res) =>{
            setService(res.data);
            console.log("response",res.data);
            setLoading(false)
        });
    },[])

    const handleOrderNow = () => {
      navigate(`/services/${serviceID}/order`);
  };



  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            {/* Top grid: Images + Summary */}
          <ServiceImages  images={service?.images} title={service?.title}/>

          {/* Description */}
          <div className="mt-6 bg-base-100 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Service Description</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{service?.requirements}</p>

            {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Key features</h4>
                <ul className="mt-2 space-y-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="badge badge-outline badge-lg">{i + 1}</span>
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div> */}
          </div>

          {/* Reviews */}
          {/* <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Buyer Reviews</h3>
            {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-base-100 rounded-xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                        {r.name.split(' ').map((n) => n[0]).slice(0,2).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{r.name}</div>
                            <div className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`h-4 w-4 ${i < r.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-muted-foreground ml-2">{r.rating.toFixed(1)}</div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{r.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-base-200 rounded-lg text-center text-sm text-muted-foreground">No reviews yet — be the first to leave feedback!</div>
            )}
          </div> */}
        </div>

        {/* Right column: Order card */}
        <aside className="space-y-4">
          <div className="sticky top-6 p-6 bg-base-100 rounded-2xl shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{service?.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">by <span className="font-medium">{service?.seller?.name ? service?.seller.name : "No name Added"}</span></p>
                <p className='mt-3'><span >Delivary time:</span><span className='font-semibold'>{service?.delivery_time} days</span></p>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5 text-muted-foreground" />
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm">{rating} ({ratingCount})</div>
                  </div> */}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-muted-foreground">Starting at</div>
                <div className="text-2xl font-bold">${service?.price}</div>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={handleOrderNow} className="btn btn-primary btn-block btn-lg">Order Now</button>
              <button className="btn btn-outline btn-block mt-3">Contact Seller</button>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              <p>Includes basic design tasks. Custom requests may change delivery time and price.</p>
            </div>
          </div>

          {/* <div className="p-4 bg-base-200 rounded-lg">
            <h4 className="font-medium">What you get</h4>
            <ul className="mt-2 text-sm space-y-2">
              <li>✅ Figma Source Files</li>
              <li>✅ Clickable Prototype</li>
              <li>✅ Handoff-ready assets</li>
            </ul>
          </div> */}

          <div className="p-4 bg-base-100 rounded-lg shadow-sm text-sm">
            <h4 className="font-medium">Seller Info</h4>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">{service?.seller?.name?.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <div>
                <div className="font-medium">{service?.seller?.name}</div>
                <div className="text-xs text-muted-foreground">Top rated seller • 5 years on platform</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky bottom bar for mobile */}
      <div className="fixed left-0 right-0 bottom-0 md:hidden p-4 bg-base-100 border-t border-base-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Starting at</div>
            <div className="text-lg font-bold">${service?.price}</div>
          </div>
          <div className="flex-1">
            <button onClick={handleOrderNow} className="btn btn-primary btn-block">Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ServiceDetails;