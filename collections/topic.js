Topics = new Meteor.Collection("topics");

/*
 * Topics will have:
 *   name: a string of the name of this topic
 *     this name will be seen on the list of topics
 *   description: a string of the description of this topic
 *     this will be shown when the given topic is selected to be voted on
 *   options: an array of all of the options of this topic
 *     each option has
 *       id: its id (will be an incremented integer starting at 0)
 *       name: its name
 *
 * Example:
 *   name: "ACSL President '15--'16"
 *   description: "Who should be the ACSL President for the school year of 2015--2016?"
 *   options: [
 *       {
 *           "name": "Sam Craig",
 *           "id": "some_id"
 *       }
 *   ]
 */
