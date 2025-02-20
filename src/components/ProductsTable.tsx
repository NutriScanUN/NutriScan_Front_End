
interface Props{
  products:any
}

export const ProductsTable:React.FC<Props> = (props) => {
  return (
    <div>{props.products}</div>
  )
}


export default ProductsTable;
