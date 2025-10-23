
import f1 from "../../assets/images/feature1.png";
import f2 from "../../assets/images/feature2.png";
import f3 from "../../assets/images/feature3.png";



const Features = () => {
    const features = [
        {
            image:f1,
            title : "Clean Design",
            description : "Clean DesignLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna incididunt ut labore aliqua",
        },
        {
            image:f2,
            title : "Responsive Layout",
            description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna incididunt ut labore aliqua.",
        },
        {
            image:f3,
            title : "Great Support",
            description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna incididunt ut labore aliqua.",
        },
    ]
    return (
        <section className='px-8 py-15 bg-white text-black '>
            <div className="py-8">
                <h1 className="flex justify-center font-bold text-5xl text-cyan-900">Our Features</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
                {features.map((feature,index) => (
                    <div key={index} className='flex flex-col items-center text-center '>
                        <img className='max-w-md drop-shadow-lg size-30' src={feature.image} alt="" />
                        <h3 className='text-xl font-bold mt-2'>{feature.title}</h3>
                        <p className='text-gray-700 text-sm'>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;