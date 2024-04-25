
# Implement an in-memory social media platform

# 1. createPost(userId, postId)
# 2. follow(followerId, followedId)
# 3. unfollow(followerId, followedId)
# 4. getNewsFeed(userId)
#     1. Return a list of 10 most recent post ids in the user’s news feed
#     2. The news feed must contain posts created by the user themselves or the users they follow
#     3. News feed must be in descending chronological order

# For example:
# createPost(userId1, postId1)
# createPost(userId2, postId2)
# follow(userId1, userId2)
# getNewsFeed(userId1) // postId2, postId1
# getNewsFeed(userId2) // postId2
# unfollow(userId1, userId2)
# getNewsFeed(userId1) // postId1

import time
from collections import defaultdict

class Social_Media:
    def __init__(self):
        self.user_posts = defaultdict(list)
        self.following = defaultdict(set)

    def create_post(self, user_id, post_id):
        self.user_posts[user_id].append((post_id, time.time()))

    def follow(self, follower_id, followed_id):
        if (follower_id != followed_id):
            self.following[follower_id].add(followed_id)
    
    def unfollow(self, follower_id, followed_id):
        if (followed_id in self.following[follower_id]):
            self.following[follower_id].remove(followed_id)

    def get_news_feed(self, user_id):
        posts = []
        for followed_id in self.following[user_id]:
            posts.extend((post_id, post_time) for post_id, post_time in self.user_posts[followed_id])
        posts.extend((post_id) for post_id in self.user_posts[user_id])

        posts.sort(key = lambda x: x[1], reverse = True)
        posts = set(posts)
        for post in posts:
            print(f'Post ID: {post[0]}')
        print()
        print(posts)


userId1 = 1
postId1 = 1
userId2 = 2
postId2 = 2

sm = Social_Media()
sm.create_post(userId1, postId1)
sm.create_post(userId2, postId2)
sm.follow(userId1, userId2)
sm.get_news_feed(userId1) # postId2, postId1
sm.get_news_feed(userId2) # postId2

sm.unfollow(userId1, userId2)
sm.follow(userId1, userId1)
sm.get_news_feed(userId1) # postId1