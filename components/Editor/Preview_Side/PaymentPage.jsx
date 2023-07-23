import axios from 'axios';

const PaymentPage = ({ price }) => {
  const handleSubscription = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/payment',
        {
          priceId: price.id
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      window.location.assign(data);
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div className="shadow-2x1 mt-10 max-w-[1040px] border-4 border-gray-100 text-center">
      <div>
        <div className="h-28 items-center bg-gray-100 font-bold">
          <div className="flex flex-col items-center justify-center pt-4">
            <h4 className="text-3x1">Event Registration Fee</h4>
            <h1 className="text-5x1 font-bold">
              {(price.unit_amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'SGD'
              })}
            </h1>
            <button onClick={handleSubscription}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
