import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Headers from '../Attendece/Headers';
import { useGetInitailSystemQuery } from '../../api/InitialSystem';

const AttendeceLayout = () => {
    const location=useLocation()
  

    const { data,  isLoading,refetch } = useGetInitailSystemQuery(10);
    
  
    const opions = data?.data?.map((item) => ({
        title: item.title,       
      route: item.description,        
    }));
  
  useEffect(() => {
    

    refetch()
  }, [refetch]);
    return (
        <div>
{location.pathname=="/app/Attendance"?<></>:<>
  <div className='px-10 pt-10 pb-2'>
                      <Headers options={opions} loading={isLoading} />
          </div></>}
          

        <Outlet />
      </div>
    );
}

export default AttendeceLayout;
