import React from 'react';
import './aboutus.css';

const AboutUs = () => {
  return (
    <div className="container-fluid bg-image">
      <div className="relative rounded-3xl p-10 2xl:-mx-10 pt-10">
        <div className="flex items-center space-x-3 content-wrapper">
          <h1 className="font-hero text-3xl leading-none text-white"></h1>
        </div>
        <div className="text-black box1">
          <h2>Welcome to OptiSnap!</h2>
          <p className="text-left">
            At OptiSnap, we are dedicated to enhancing your digital experience by providing innovative solutions that streamline and optimize the way you manage and share images on the web. Our mission is to reduce internet traffic and improve website performance by offering a unique service that transforms how images are used and distributed online.
          </p>
          <h2>What We Do</h2>
          <p className="text-left">
            OptiSnap offers a dynamic platform where users can effortlessly create and manage different workspaces tailored to their specific needs. Within these workspaces, you can upload your images, and we take care of the rest. Our advanced processing technology generates optimized URLs for each image, ensuring that they are ready to be seamlessly integrated into your website or online projects.
          </p>
          <h2>Why Choose OptiSnap?</h2>
          <ul className="list-disc list-inside">
            <li className="text-left">Efficiency: By providing URLs for optimized images, we help reduce the load on your servers and speed up your website's load times.</li>
            <li className="text-left">Simplicity: Our user-friendly interface makes it easy for anyone to upload images and get their optimized URLs in just a few clicks.</li>
            <li className="text-left">Versatility: Whether you are a web developer, designer, or a business owner, our platform caters to all your image management needs with tailored workspaces.</li>
            <li className="text-left">Performance: Optimized images mean faster load times, which leads to a better user experience and improved SEO for your website.</li>
          </ul>
          <h2>Our Commitment</h2>
          <p className="text-left">
            We are committed to sustainability and efficiency in the digital world. By reducing internet traffic and optimizing image delivery, we aim to make the web faster and more eco-friendly. Join us in our mission to create a more efficient internet, one optimized image at a time.
          </p>
          <p className="text-left">Explore OptiSnap today and discover how we can help you enhance your online presence while contributing to a more sustainable digital future.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
