import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom";




const Modala = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();


      const location = useLocation();
    const navigate = useNavigate();
   

    const onSubmit = async (data) => {
      setLoading(true);
      try {
        if (!data.name || !data.description || !data.price || !data.quantity || !data.imageurl || !data.manufacturer || !data.category || !data.productid) {
          setErrorMessage('All fields are required');
          setLoading(false);
          return;
        }
        const productData = {
          Name: data.name,
          Description: data.description,
          Price: Number(data.price),
          manufacturer: data.manufacturer,
          Quantity: Number(data.quantity),
          Category: data.category,
          ImageUrl: data.imageurl,
          productId: data.productid,
        };
  
        // Reference to the "Products" collection (you may change this to your desired collection name)
        
  
        // Add the product data to Firestore
        const docRef = await setDoc(doc(db, "Products",data.productid ),productData );
  
        // Retrieve the document ID
      
  
        // Close the modal
        document.getElementById('my_modal_5').close();
        setLoading(false);
  
        // Navigate to /barcode with the document ID as a parameter
        navigate(`/barcode/${data.productid}`, { state: { from: location } });
      } catch (error) {
        console.error('Error adding product to Firestore:', error);
        setErrorMessage('Error adding product. Please try again.');
      }
    };
    

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle backdrop-blur-sm">
    <div className="modal-box">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
          
          <h3 className="font-bold text-lg">Add Product</h3>

          {/* name */}
          <div className="form-control mb-3">
            
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-red-600 text-xs italic">Name is required</span>}
          </div>

          {/* description */}
          <div className="form-control mb-3">
            
            <input
              type="text"
              placeholder="Description"
              className="input input-bordered"
              {...register("description", { required: true })}
            />
            {errors.name && <span className="text-red-600 text-xs italic">Description is required</span>}
            
          </div>
           {/* productId */}
           <div className="form-control mb-3">
            
            <input
              type="text"
              placeholder="Product Id"
              className="input input-bordered"
              {...register("productid", { required: true })}
            />
            {errors.name && <span className="text-red-600 text-xs italic">Product id is required</span>}
            
          </div>
           {/* Price */}
           <div className="form-control mb-3">
          
            <input
              type="number"
              placeholder="price"
              className="input input-bordered"
              {...register("price", { required: true })}
            />
            {errors.name && <span className="text-red-600 text-xs italic">Price is required</span>}
            
          </div>
           {/* quantity */}
           <div className="form-control mb-3">
            
            <input
              type="number"
              placeholder="quantity"
              className="input input-bordered"
              {...register("quantity", { required: true })}
            />
            {errors.name && <span className="text-red-600 text-xs italic">Quantity is required</span>}
            
          </div>
          {/* imageurl */}
          <div className="form-control mb-3">
           
            <input
              type="text"
              placeholder="imageurl"
              className="input input-bordered"
              {...register("imageurl", { required: true })}
            />
            {errors.name && <span className="text-red-600 text-xs italic">image is required</span>}
            
          </div>
            {/* manufacturer */}
            <div className="form-control mb-3">
           
            <input
              type="text"
              placeholder="manufacturer"
              className="input input-bordered"
              {...register("manufacturer", { required: true })}
            />
            {errors.name && <span className="text-red-600 text-xs italic">manufacturer is required</span>}
            
          </div>
          {/* category */}
          <div className="form-control mb-3">
           
            <input
              type="text"
              placeholder="category"
              className="input input-bordered"
              {...register("category", { required: true })}
            />
            {errors.name && <span className="text-red-600 text-xs italic">category is required</span>}
            
          </div>

          {/* error */}
          {
            errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p> : ""
          }

          {/* Add button btn */}
          <div className="form-control mt-4">
            
            <input
              type="submit"
              value="AddProduct"
              className="btn bg-blue-500 text-white"
            />
          </div>

        
          <button 
          htmlFor="my_modal_5"
          onClick={() => document.getElementById("my_modal_5").close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >✕</button>
        </form>

       
      
      </div>
    </div>
  </dialog>
  )
}

export default Modala
