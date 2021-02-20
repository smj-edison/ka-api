const GET_FULL_USER_PROFILE_QUERY = "" +
`query getFullUserProfile($kaid: String, $username: String) {
  user(kaid: $kaid, username: $username) {
    id
    kaid
    key
    userId
    email
    username
    profileRoot
    gaUserId
    qualarooId
    isPhantom
    isDeveloper: hasPermission(name: "can_do_what_only_admins_can_do")
    isCurator: hasPermission(name: "can_curate_tags", scope: ANY_ON_CURRENT_LOCALE)
    isCreator: hasPermission(name: "has_creator_role", scope: ANY_ON_CURRENT_LOCALE)
    isPublisher: hasPermission(name: "can_publish", scope: ANY_ON_CURRENT_LOCALE)
    isModerator: hasPermission(name: "can_moderate_users", scope: GLOBAL)
    isPublic
    isParent
    isSatStudent
    isTeacher
    isDataCollectible
    isChild
    isOrphan
    isActivityAccessible
    isCoachingLoggedInUser
    canModifyCoaches
    nickname
    hideVisual
    joined
    points
    countVideosCompleted
    publicBadges {
      badgeCategory
      description
      isOwned
      isRetired
      name
      points
      absoluteUrl
      hideContext
      icons {
        smallUrl
        compactUrl
        emailUrl
        largeUrl
        __typename
      }
      relativeUrl
      safeExtendedDescription
      slug
      translatedDescription
      translatedSafeExtendedDescription
      __typename
    }
    bio
    background {
      name
      imageSrc
      __typename
    }
    soundOn
    muteVideos
    prefersReducedMotion
    noColorInVideos
    autocontinueOn
    avatar {
      name
      imageSrc
      __typename
    }
    hasChangedAvatar
    newNotificationCount
    canHellban: hasPermission(name: "can_ban_users", scope: GLOBAL)
    canMessageUsers: hasPermission(name: "can_send_moderator_messages", scope: GLOBAL)
    canEvalCsProjects
    discussionBanned
    isSelf: isActor
    hasStudents: hasCoachees
    hasClasses
    hasChildren
    hasCoach
    badgeCounts
    homepageUrl
    isMidsignupPhantom
    streakLastExtended
    streakLastLength
    includesDistrictOwnedData
    preferredKaLocale {
      id
      kaLocale
      status
      __typename
    }
    transferAuthUrl(pathname: "")
    __typename
  }
}
`;

module.exports = getFullUserProfileQuery;