import Card from "../../components/Card/Card";
import { useEffect } from "react";
import { useGetInitailSystemQuery } from "../../api/InitialSystem";

const Documents = () => {



    const { data,  isLoading,refetch } = useGetInitailSystemQuery(11);
    const { data:data2,  isLoading:islodaing2,refetch:refetch2 } = useGetInitailSystemQuery(12);
    
  
    const pages = data?.data?.map((item) => ({
      icon: item.icone,
        title: item.title,       
      route: item.description,        
    }));
    const pages2 = data2?.data?.map((item) => ({
      icon: item.icone,
        title: item.title,       
      route: item.description,        
    }));
  
    
    useEffect(() => {
      
  
      refetch()
      refetch2()
    }, [refetch,refetch2]);

  const tittle="الخطابات الرسمية"
  const tittle2="الوثائق"
  

  return <>
  <div className=" px-5">
      {isLoading ||islodaing2?<>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>:<>
        <Card pages={pages} grid={2} tittle={tittle}/>
        <Card pages={pages2} grid={2} tittle={tittle2}/>
        </>}
  </div>
    </>

};

export default Documents;
