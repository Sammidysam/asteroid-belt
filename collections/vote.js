Votes = new Meteor.Collection("votes");

/*
 * Votes will have:
 *   topic_id: the id of the topic that this vote was for
 *   option_id: the id of the option that this vote was for
 *     the correct option will be identified because the vote has a topic
 *
 * Example:
 *   topic_id: some_id
 *   option_id: some_id
 */
