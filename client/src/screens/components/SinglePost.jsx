import Sidebar from "./Sidebar";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

const SinglePost = () => {
  return (
    <div className="flex justify-between mt-4 mb-20 mx-10">
      <div className="mr-16 w-3/4">
        <div className="w-full h-1/2 mb-4">
          <img
            className="w-full h-full object-center rounded-md"
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-3xl font-bold">Lorem ipsum dolor</div>
          <div className="flex items-center text-xl">
            <BiEdit className="mr-4 text-gray-500" />
            <RiDeleteBin5Fill className="text-red-500" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            Author:
            <b className="ml-2">Safak</b>
          </div>
          <span className="text-sm">1 day ago</span>
        </div>
        <p className="font-normal text-sm leading-6 text-gray-500 mt-4 overflow-hidden text-ellipsis">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis
          quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae,
          adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
          Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem
          doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci
          voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
          error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum
          necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore
          ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis
          quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae,
          adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
          Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem
          doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci
          voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur.
        </p>
      </div>

      <Sidebar />
    </div>
  );
};

export default SinglePost;
