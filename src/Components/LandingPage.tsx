import React, { useEffect } from 'react';
import '../Styles/LandingPage.css';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DATA } from '../Redux/actionType';
import { useSearchParams } from 'react-router-dom';


interface RootState {
  data: DataObject[];
}


interface DataObject {
  name: string;
  description: string;
  background:boolean;
}

const LandingPage = () => {
  const dispatch = useDispatch();
  
  const selector = useSelector((state: RootState) => state);

  const [searchParams, setSearchParams] = useSearchParams();

  const customConfig: Config = {
    dictionaries: [adjectives, colors],
    separator: ' ',
    length: 2,
  };

  const bigCustomConfig: Config = {
    dictionaries: [adjectives, colors,animals,adjectives, colors,animals,adjectives, colors,animals,adjectives, colors,animals,adjectives, colors,animals,adjectives, colors,animals,adjectives, colors,animals],
    separator: ' ',
    length: 21,
  };

  const handleClick = (e)=>{
    e.preventDefault();
    const temp_data=selector.data;
    for(let i=0;i<temp_data.length;i++){
        if(temp_data[i].background){
            temp_data[i].background=false;
            break;  
        }
    }
    temp_data[Number(e.target.className)-1].background=true;
    dispatch({type:SET_DATA,payload:temp_data});
    console.log(e.target.className);
    setSearchParams({ id: e.target.className} );
    console.log(searchParams)
    
  }

  useEffect(() => {
    setSearchParams({ id: 1 });
    const data: DataObject[] = [];

    for (let i = 0; i < 1000; i++) {
      const shortName: string = uniqueNamesGenerator(customConfig);
      const description: string = uniqueNamesGenerator(bigCustomConfig);
      const obj: DataObject = {
        name: shortName,
        description: description,
        background:false
      };
      
      data.push(obj);
    }
    data[0].background=true;
    console.log(data); // Add this line to see if data is populated correctly

    dispatch({ type: SET_DATA, payload: data });

  }, [dispatch]);

  return (
    
    <>
    <h1 className='heading'>User Data</h1>
    <div className='main-box'>
      <div>
        {
          selector.data.map((e: DataObject, index: number) => (
            <div key={index} className={`${index+1}`} style={{background:e.background?"rgb(210, 210, 210)":"transparent",borderRight:e.background?"2px solid":"transparent"}} onClick={handleClick}>
              <h1 className={`${index+1}`}>{e.name}</h1>
              <p className={`${index+1}`}>{e.description}</p>
            </div>
          ))
        }
      </div>
     
      <div>
       {
        selector.data.map((e:DataObject,index : number)=>(
            e.background==true?
            <>
            <h1>
        {
            selector.data[index]?selector.data[index].name:""
        }
       </h1>
       <p>
        {
          selector.data[index]?selector.data[index].description:""  
        }
       </p>
       <div className="image-grid">
            {
                selector.data[index]?<>
              <img src={`https://random.imagecdn.app/${100+index}/150`} className='random-image' alt='random-image'/>
              <img src={`https://random.imagecdn.app/${200+index}/150`} className='random-image' alt='random-image'/>
              <img src={`https://random.imagecdn.app/${300+index}/150`} className='random-image' alt='random-image'/>
              <img src={`https://random.imagecdn.app/${400+index}/150`} className='random-image' alt='random-image'/>
              <img src={`https://random.imagecdn.app/${500+index}/150`} className='random-image' alt='random-image'/>
              <img src={`https://random.imagecdn.app/${600+index}/150`} className='random-image' alt='random-image'/>
              <img src={`https://random.imagecdn.app/${700+index}/150`} className='random-image' alt='random-image'/>
              <img src={`https://random.imagecdn.app/${800+index}/150`} className='random-image' alt='random-image'/>
              <img src={`https://random.imagecdn.app/${900+index}/150`} className='random-image' alt='random-image'/>
                </>:<></>
            }
            </div>
            </>:<></>
        ))
       }
      </div>
    </div>
    </>
  );
};

export default LandingPage;
