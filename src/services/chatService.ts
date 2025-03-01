
interface ChatResponse {
  message: string;
  platform?: 'segment' | 'mparticle' | 'lytics' | 'zeotap';
}

// Mock data for CDP platforms
const cdpData = {
  segment: {
    sourceSetup: "To set up a new source in Segment:\n1. Navigate to the Sources page in your Segment workspace\n2. Click 'Add Source' and select the source type\n3. Configure the source with the required credentials\n4. Follow the integration instructions to start collecting data\n5. Verify data is flowing using the Debugger",
    userProfile: "Segment doesn't directly create user profiles, but instead collects and routes user data. To track users:\n1. Implement the identify() call with a user ID\n2. Add user traits like name, email, etc.\n3. Use the Personas product to create unified user profiles from your data",
    audienceSegment: "Segment's Personas product allows you to create audience segments:\n1. Go to Audiences in your Personas workspace\n2. Click 'New Audience'\n3. Define conditions based on user traits or events\n4. Preview audience size and save\n5. Sync the audience to your desired destinations",
  },
  mparticle: {
    sourceSetup: "To set up a new source in mParticle:\n1. Navigate to Setup > Inputs in your mParticle dashboard\n2. Select the platform for your integration (Web, iOS, Android, etc.)\n3. Follow the setup instructions and copy the API credentials\n4. Implement the SDK in your application using the provided credentials\n5. Configure the data collection settings as needed",
    userProfile: "To create a user profile in mParticle:\n1. Implement the identify method in your application\n2. Set a unique customer ID and user identities (email, etc.)\n3. Add user attributes with the setUserAttribute method\n4. User profiles will be automatically created in the Identity section\n5. You can view unified customer profiles in the User Activity section",
    audienceSegment: "To build an audience segment in mParticle:\n1. Go to Audiences in your mParticle dashboard\n2. Click 'Create Audience'\n3. Define audience criteria using user attributes and events\n4. Set audience output frequency and destinations\n5. Activate the audience to make it available to your destinations",
  },
  lytics: {
    sourceSetup: "To set up a new source in Lytics:\n1. Navigate to Connect > Data Sources in your Lytics dashboard\n2. Click 'Add Data Source' and select from available collectors\n3. Configure the connection settings and authentication details\n4. Define the schema mapping for your data\n5. Save and validate the connection is working properly",
    userProfile: "Lytics automatically creates user profiles based on collected data. To enhance user profiles:\n1. Implement the Lytics JavaScript tag or server-side collection\n2. Use identify() to link known user identities\n3. Send user attributes and behaviors through your integration\n4. Profiles are automatically created and updated in real-time\n5. View user profiles in the Explore section of Lytics",
    audienceSegment: "To build an audience segment in Lytics:\n1. Go to Orchestrate > Audiences in your Lytics dashboard\n2. Click 'Create Audience'\n3. Use the segment builder to define audience criteria based on user attributes or behaviors\n4. Preview audience size and composition\n5. Save the audience and use it for personalization or activation",
  },
  zeotap: {
    sourceSetup: "To set up a new source in Zeotap:\n1. Navigate to Sources in your Zeotap CDP dashboard\n2. Click 'Add New Source' and select the source type\n3. Configure the connection parameters and authentication details\n4. Map the incoming data to your unified customer data model\n5. Activate the source and monitor data collection via the Dashboard",
    userProfile: "To create user profiles in Zeotap:\n1. Set up data ingestion through a source integration\n2. Define identity resolution rules in Settings > Identity Resolution\n3. Configure customer attributes in your unified customer data model\n4. Zeotap will automatically create unified customer profiles\n5. View and explore profiles in the Customer 360 view",
    audienceSegment: "To build an audience segment in Zeotap:\n1. Go to the Audiences section in the Zeotap dashboard\n2. Click 'Create New Audience'\n3. Define your audience criteria using attributes, behaviors, and lookalike models\n4. Preview audience size and composition\n5. Save and publish the audience for activation to your marketing channels",
  },
};

// Examples of common CDP tasks
const commonQueries = {
  source: {
    keywords: ['source', 'setup', 'configure', 'integration', 'connect', 'implement'],
    responses: {
      segment: cdpData.segment.sourceSetup,
      mparticle: cdpData.mparticle.sourceSetup,
      lytics: cdpData.lytics.sourceSetup,
      zeotap: cdpData.zeotap.sourceSetup,
    }
  },
  profile: {
    keywords: ['profile', 'user', 'customer', 'identity', 'identify'],
    responses: {
      segment: cdpData.segment.userProfile,
      mparticle: cdpData.mparticle.userProfile,
      lytics: cdpData.lytics.userProfile,
      zeotap: cdpData.zeotap.userProfile,
    }
  },
  audience: {
    keywords: ['audience', 'segment', 'segmentation', 'group', 'targeting'],
    responses: {
      segment: cdpData.segment.audienceSegment,
      mparticle: cdpData.mparticle.audienceSegment,
      lytics: cdpData.lytics.audienceSegment,
      zeotap: cdpData.zeotap.audienceSegment,
    }
  },
};

// CDP platform names and keywords for detection
const platformKeywords = {
  segment: ['segment', 'segment.com', 'segment.io'],
  mparticle: ['mparticle', 'mparticle.com', 'm-particle'],
  lytics: ['lytics', 'lytics.com', 'lytics.io'],
  zeotap: ['zeotap', 'zeotap.com'],
};

/**
 * Determines which CDP platform the query is asking about
 */
const detectPlatform = (query: string): string | null => {
  const normalizedQuery = query.toLowerCase();
  
  for (const [platform, keywords] of Object.entries(platformKeywords)) {
    if (keywords.some(keyword => normalizedQuery.includes(keyword))) {
      return platform;
    }
  }
  
  return null;
};

/**
 * Determines which common CDP task the query is asking about
 */
const detectQueryType = (query: string): string | null => {
  const normalizedQuery = query.toLowerCase();
  
  for (const [queryType, data] of Object.entries(commonQueries)) {
    if (data.keywords.some(keyword => normalizedQuery.includes(keyword))) {
      return queryType;
    }
  }
  
  return null;
};

/**
 * Processes a chat message and returns an appropriate response
 */
export const processChatMessage = async (message: string): Promise<ChatResponse> => {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const platform = detectPlatform(message);
  const queryType = detectQueryType(message);
  
  // If the question is not related to CDPs
  if (!platform && !queryType) {
    return {
      message: "I'm focused on helping with CDP platforms (Segment, mParticle, Lytics, and Zeotap). Could you ask something related to these platforms? For example, you could ask how to set up a source in Segment or how to create a user profile in mParticle.",
    };
  }
  
  // If we know the platform and query type
  if (platform && queryType) {
    return {
      message: commonQueries[queryType].responses[platform],
      platform: platform as any,
    };
  }
  
  // If we know the query type but not the platform
  if (queryType && !platform) {
    // Suggest answers for all platforms
    let response = "I can help you with that for different CDP platforms:\n\n";
    
    Object.entries(commonQueries[queryType].responses).forEach(([plat, answer]) => {
      response += `For ${plat.charAt(0).toUpperCase() + plat.slice(1)}:\n${answer.split('\n')[0]}\n...\n\n`;
    });
    
    response += "Which platform would you like more detailed information about?";
    return { message: response };
  }
  
  // If we know the platform but not the query type
  if (platform && !queryType) {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
    return {
      message: `I see you're asking about ${platformName}. I can help you with setting up sources, creating user profiles, or building audience segments. What would you like to know about ${platformName}?`,
      platform: platform as any,
    };
  }
  
  // Fallback response
  return {
    message: "I'm here to help with your CDP-related questions. Could you provide more details about what you'd like to know?",
  };
};
