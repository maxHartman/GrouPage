![](https://i.imgur.com/yMJVreL.png)

__Authors__: Max Hartman, Aspyn Palatnick  
__Date__: Spring 2020

## Abstract
We present GrouPage: an application for members of an existing organization to anonymously interact with a server after verifying their membership in a group within the organization. Existing systems offer peer-to-peer anonymity but frequently require non-anonymous accounts. Our underlying encryption system uses *verifiably common secret encodings*, which were first introduced by Stuart Schechter, Todd Parnell, and Alexander Hartemink in 1999. GrouPage takes the form of a web application, currently allowing fictitious users to interact with each other anonymously while being certain that every individual present has authorized credentials. Ideally, GrouPage will support students at the University of Pennsylvania interacting with each other.

## Project Objectives
Our project intends to address the question of how to create an online service that ensures all users are authenticated by a particular authentication service while preserving anonymity. We want to guarantee that all interactions with the online service, such as users uploading posts on a forum, are anonymous. Moreover, the server provides each user with a set of specific possible actions but leaks no information regarding actions a user has taken. With these goals in mind, our target objectives are as follows:
1. Architect an anonymous authentication system and show the efficacy of the model
2. Implement a functional prototype of the anonymous authentication system
3. Demonstrate the effectiveness in practice of the system

## Steps to Run
1. Open a terminal window
2. Run the following: `cd platform/react-client`
3. `yarn`
4. `yarn watch` (ignore errors that may show, they are only typescript related)
5. Open another terminal window 
6. `cd platform/server`  
7. `yarn`  
8. `yarn watch`  
9. Finally, in your favorite web browser, go to `https://localhost:443`

## About Us
We are 2 Computer & Information Science Master's candidates at the University of Pennsylvania. This work was done to fulfill a final project for CIS 700: Privacy enhancing technologies. The course website with the project requirements can be found [here](https://www.cis.upenn.edu/~sga001/classes/cis700s20/).

Note: We use the hybrid-crypto-js npm module for public-private key encryption. However, we needed to modify the code in this module to allow for deterministic encryption (using a deterministic initialization vector rather than a randomized one), which is why you will see that library included in our source code rather than just as an npm module.
