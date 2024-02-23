import React,{useState, useEffect,useContext} from "react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../Auth/post";

import "./index.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
const Index = () => {
  const [data,setData] = useState("");
   const dataPost = useContext(PostContext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/place/699f071e-f8c7-40a3-8bfa-0ace8bac87e4");

      const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setData(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
  }, []);


  return (
    <React.Fragment>
      <div className="container">
        <div style={{position: "relative"}}>
          <h1 className="title-collection mb-3 mt-4">Hôm nay ăn gì </h1>
          <div className="mt-3">
            <div dir="ltr" className="slick-slider slick-initialized">
            <button className="prev btn-nav d-flex align-items-center justify-content-center slick-arrow slick-prev">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="slick-list">
              <div className="slick-track" style={{width: "5850px", opacity: 1},{transform: 'translate3d(-2574, 0, 0)'}}>
              <div tabIndex="-1" data-index="0" aria-hidden="true" className="slick-slide" style={{outline:"none"},{width: "234px"}} >
                <div >
              <a href="#" tabIndex="-1" style={{width:"100%"}}  className="" >
                <div className="mx-2" >
                  <div className="collection-item  row-data" > 
                    <div className="thumbnail-wrapper d-flex align-items-center justify-content-center ratio_16-9"  >
                      <img alt="buffet lau" title="Buffet Lẩu" src="https://static.riviu.co/480/image/2020/09/17/9b574147eac4141955abff0b5b9ea4ca.jpeg" className="  thumbnail-inner" style={{objectFit:"cover"}} ></img>
                    </div> 
                    <div className="title mx-2 mt-1" >
                      <h3 className="text-truncate px-2 py-1" >Buffet Lẩu</h3> 
                      <div >
                        {/* <div className="review_count px-2 py-1" >313 bài viết</div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
              </div>
            </div>
            <button class="next btn-nav d-flex align-items-center justify-content-center slick-arrow slick-next">
              <i class="fas fa-chevron-right"></i>
            </button>
            </div>
          </div>
        </div>
        <div style={{position: "relative"}}>
          <h1 className="title-collection mb-3 mt-4"> Món ngon mỗi ngày </h1>
          <div className="mt-3">
          <div dir="ltr" className="slick-slider slick-initialized">
                <div className="slick-list">
                  <div className="slick-track" style={{width: "5850px", opacity: 1},{transform: 'translate3d(-2574, 0, 0)'}}>
                  {Object.keys(data).map(place=>(<div tabIndex="-1" data-index="0" aria-hidden="true" className="slick-slide" style={{outline:"none"},{width: "234px"}} >
                    <div >
                      <a href="#" tabIndex="-1" style={{width:"100%"}}  className="" >
                      <div className="mx-2" >
                        <div className="collection-item  row-data" > 
                          <div className="thumbnail-wrapper d-flex align-items-center justify-content-center ratio_16-9"  >
                            <NavLink to="/post" exact><img alt="buffet lau" title="Ẩm thực miền Bắc" src={data[place].image} className="  thumbnail-inner" style={{objectFit:"cover"}}
                             onClick={e => dataPost.getid(data[place]._id)} ></img></NavLink>
                          </div> 
                          <div className="title mx-2 mt-1" >
                            <h3 className="text-truncate px-2 py-1" >{data[place].name}</h3> 
                              <div >
                                {/* <div className="review_count px-2 py-1" >1 bài viết</div> */}
                              </div>
                          </div>
                        </div>
                      </div>
                      </a>
                    </div>
                  </div>))}
                </div>
                </div>
          </div>
          </div>
          
        </div>
      </div>
      
    </React.Fragment>
 
  );
};

export default Index;
