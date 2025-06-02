import { Outlet, useLocation } from 'react-router-dom';
import Headers from '../Self_Services/Headers';
import { useEffect } from 'react';
import { useGetInitailSystemQuery } from '../../api/InitialSystem';

const SelfServices = () => {
  const location=useLocation()
  
    
     const { data,  isLoading,refetch } = useGetInitailSystemQuery(3);
      
    

    
    const opions = data?.data?.map((item) => ({
      title: item?.title,       
      route: item?.description,        
    }));

  
  useEffect(() => {
    

    refetch()
  }, [refetch]);
    return (
        <div>
{location.pathname=="/app/Self_Service"?<></>:<>
  <div className='px-10 pt-10 pb-2'>
                      <Headers options={opions} loading={isLoading} />
          </div></>}
          

        <Outlet />
      </div>
    );
}

export default SelfServices;
