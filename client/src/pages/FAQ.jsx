import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';

const HelpCenter = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen mt-24' style={{ backgroundImage: 'url("AboutUs_bg2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="text-center">
        <p className='text-7xl text-blue mt-1 mb-5'>How can we help you?</p>
      </div>
      <div className="w-full max-w-3xl"> {/* Container with maximum width */}
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <span className='text-5xl text-black'>What is the purpose of the Purchase Management Portal?</span>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} className='text-3xl'>
              The Purchase Management Portal is designed to simplify the process of filling purchase management forms for purchasing any item in the institute by a faculty/Department. It allows users to download a prefilled form and send it online for further procedures, making the process easier, faster, and eco-friendly.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <span className='text-5xl text-black'>Who can use the Purchase Management Portal?</span>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} className='text-3xl'>
              The Purchase Management Portal can be used by any faculty or department in the institute to request the purchase of any item.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <span className='text-5xl text-black'>How do I access the Purchase Management Portal?</span>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} className='text-3xl'>
              The Purchase Management Portal can be accessed through the IIT ROPAR website. Simply navigate to the Purchase Management Portal page and log in with your institute credentials.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default HelpCenter;
