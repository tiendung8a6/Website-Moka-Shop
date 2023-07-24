export default function ShippingAddressDetails({ shippingAddress }) {
  return (
    <div className="relative mx-auto my-auto">
        <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-10">
          <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Shipping Address Details
          </p>
          <p className="mt-2 text-md text-black">
            Full Name: {shippingAddress?.firstName} {shippingAddress?.lastName},
          </p>
          <p className="mt-2 text-md text-black">
            Address: {shippingAddress?.address}
          </p>
          <p className="mt-2 text-md text-black">
            City: {shippingAddress?.city},
          </p>
          <p className="mt-2 text-md text-black">
            Country: {shippingAddress?.country},
          </p>
          <p className="mt-2 text-md text-black">
            Phone: {shippingAddress?.phone},
          </p>
          <p className="mt-2 text-md text-black">
            Postal code: {shippingAddress?.postalCode},
          </p>
        </div>
      </div>
    
  );
}
