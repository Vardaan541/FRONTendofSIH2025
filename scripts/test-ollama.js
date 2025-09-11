#!/usr/bin/env node

/**
 * Test script to verify Ollama integration
 * Run this script to test if Ollama is working correctly
 */

const fetch = require('node-fetch');

async function testOllama() {
  console.log('🧪 Testing Ollama Integration...\n');

  try {
    // Test if Ollama is running
    console.log('1. Checking if Ollama is running...');
    const response = await fetch('http://localhost:11434/api/tags');
    
    if (!response.ok) {
      throw new Error(`Ollama is not running. Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Ollama is running');
    
    // Check if llama3.2 model is available
    console.log('\n2. Checking available models...');
    const models = data.models || [];
    const llamaModel = models.find(model => model.name.includes('llama3.2'));
    
    if (!llamaModel) {
      console.log('❌ llama3.2 model not found');
      console.log('Available models:', models.map(m => m.name).join(', '));
      console.log('\nTo install llama3.2, run: ollama pull llama3.2');
      return;
    }
    
    console.log('✅ llama3.2 model is available');
    console.log(`   Model: ${llamaModel.name}`);
    console.log(`   Size: ${(llamaModel.size / 1024 / 1024 / 1024).toFixed(2)} GB`);
    
    // Test a simple generation
    console.log('\n3. Testing model generation...');
    const testResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: 'Hello! Please respond with just "Hi there!"',
        stream: false,
        options: {
          temperature: 0.1,
          max_tokens: 50
        }
      })
    });
    
    if (!testResponse.ok) {
      throw new Error(`Generation test failed. Status: ${testResponse.status}`);
    }
    
    const testData = await testResponse.json();
    console.log('✅ Model generation working');
    console.log(`   Response: ${testData.response}`);
    
    // Test career AI specific prompt
    console.log('\n4. Testing career AI prompt...');
    const careerResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: `You are a career guidance AI. Suggest one career for someone interested in "Software Development" with skills "JavaScript, Python". Return only this JSON:
{
  "title": "Career Title",
  "description": "Brief description",
  "matchScore": 90,
  "requiredSkills": ["skill1", "skill2"],
  "careerPath": ["Level 1", "Level 2"],
  "salaryRange": "$X-Y",
  "growthProspect": "High",
  "timeToAchieve": "X months",
  "nextSteps": ["Step 1", "Step 2"]
}`,
        stream: false,
        options: {
          temperature: 0.7,
          max_tokens: 500
        }
      })
    });
    
    if (!careerResponse.ok) {
      throw new Error(`Career AI test failed. Status: ${careerResponse.status}`);
    }
    
    const careerData = await careerResponse.json();
    console.log('✅ Career AI prompt working');
    console.log(`   Response preview: ${careerData.response.substring(0, 100)}...`);
    
    console.log('\n🎉 All tests passed! Ollama integration is ready.');
    console.log('\nNext steps:');
    console.log('1. Start your Next.js development server: npm run dev');
    console.log('2. Navigate to the student Career AI page');
    console.log('3. Fill out the form and test the integration');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure Ollama is installed: https://ollama.ai/');
    console.log('2. Start Ollama: ollama serve');
    console.log('3. Install the model: ollama pull llama3.2');
    console.log('4. Check if port 11434 is available');
  }
}

// Run the test
testOllama();
