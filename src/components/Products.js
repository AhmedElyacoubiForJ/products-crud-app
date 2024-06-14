import React, {useState} from 'react'

function Products() {
  const [products, setProducts] = useState([
    {id: 1, name: "Computer", price: 4300, cheched: false},
    {id: 2, name: "Phone", price: 3000, cheched: false},
    {id: 3, name: "Laptop", price: 5000, cheched: true},
    {id: 4, name: "Tablet", price: 2000, cheched: false},
  ]);

  return (
    <div className="p-1 m-1">
      <div className='row'>
        <div className='col-md-6'></div>
      </div>
      <div className="card">
        <div className="card-header"><h5>Products</h5></div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Checked</th>
                <th scope="col" colspan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.cheched}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger m-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Products
