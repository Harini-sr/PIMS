const Feedback = require('../models/feedbackModel');

exports.submitFeedback = async (req, res) => {
  try {
    const { message, issueId } = req.body;

    // Validate required field
    if (!message) {
      return res.status(400).json({ 
        success: false,
        error: 'Message is required' 
      });
    }

    // Create new feedback
    const feedback = new Feedback({
      message,
      issueId: issueId || null
    });

    // Save to database
    const savedFeedback = await feedback.save();
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      data: savedFeedback
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error submitting feedback',
      details: error.message 
    });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const { issueId } = req.query;
    let query = {};
    
    // If issueId is provided, filter by it
    if (issueId) {
      query.issueId = issueId;
    }
    
    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching feedbacks',
      details: error.message 
    });
  }
};
