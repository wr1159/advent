interface PageProps {
    userId: string;
    eventId: string;
}


export default function Template({params}: {params: PageProps}) {
  console.log(params);
  return (
    <div> 
        <p>
        </p>

        <p>   
        </p>
    </div>
  )
}