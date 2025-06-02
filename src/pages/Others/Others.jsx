import { useGetInitailSystemQuery } from "../../api/InitialSystem";
import Card from "../../components/Card/Card";
import { useEffect } from "react";

const Others = () => {



  const { data,  isLoading,refetch } = useGetInitailSystemQuery(9);
    
  
  const pages = data?.data?.map((item) => ({
    icon: item.icone,
      title: item.title,       
    route: item.description,        
  }));
  
    
    useEffect(() => {
      
  
      refetch()
    }, [refetch]);

  const tittle="انظمة اخري"
  

  return <>
  <div className=" px-5">
      {isLoading?<>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>:<>
        <Card pages={pages} grid={3} tittle={tittle}/>
        </>}
  </div>
    </>

};

export default Others;
