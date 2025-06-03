import Card from "../../components/Card/Card";
import { useEffect } from "react";
import { useGetInitailSystemQuery } from "../../api/InitialSystem";
import ProductTable from "../../components/reusable_components/DataTable";

const Holidays = () => {
const products = [
  {
    name: 'Apple MacBook Pro 17"',
    color: 'Silver',
    category: 'Laptop',
    price: '$2999',
    editLink: '#'
  },
  {
    name: 'Microsoft Surface Pro',
    color: 'White',
    category: 'Laptop PC',
    price: '$1999',
    editLink: '#'
  },
  {
    name: 'Magic Mouse 2',
    color: 'Black',
    category: 'Accessories',
    price: '$99',
    editLink: '#'
  }
];

// In your component


    const { data,  isLoading,refetch } = useGetInitailSystemQuery(7);
      
    
    const pages = data?.data?.map((item) => ({
      icon: item.icone,
        title: item.title,       
      route: item.description,        
    }));
  
    
    useEffect(() => {
      
  
      refetch()
    }, [refetch]);

  const tittle="الأجازات "
  

  return <>
  <div className=" px-5 rounded-lg bg-white my-5 mx-5 " >
   
        <Card pages={pages} grid={3} tittle={tittle}/>
        
<ProductTable products={products} />

        
  </div>
    </>

};

export default Holidays;
