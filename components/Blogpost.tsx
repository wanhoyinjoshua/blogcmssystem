import React from 'react'
export interface Props {
    heading: string;
    picture: string;
    date:string;
    blogtitleid:string;
  }
const Blogpost = (props:Props) => {
  return (
    <a href={`/blog/${props.blogtitleid}`}>
    <div className="card">
    <div className="image">
      <img
      src={props.picture}
     

      />

      


    </div>
    <div className="description">

      <div className="heading">
        <div className="headerimage"><img src="./kidsandcubslogo.webp"></img></div>
        <div className="headerwords">
         {props.heading}

        </div>
       
      </div>
      <div className="metadata">
      Last Updated on:{props.date}


      </div>

    </div>

  </div>
  </a>

  )
}

export default Blogpost