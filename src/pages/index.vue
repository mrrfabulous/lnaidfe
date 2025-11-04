<template>
  <Layout>
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-rose-50 to-pink-50 min-h-screen">
      <!-- Navigation is handled in Layout component -->
      
      <!-- Hero Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Student funding and support
            <span class="text-coral-500">solution.</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Promoting quality education and academic research through public goodwill. 
            It is an Educational crowdfunding and student situation.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <router-link 
              to="/auth/register" 
              class="bg-coral-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-coral-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started
            </router-link>
            <button 
              @click="scrollToFeatures" 
              class="border-2 border-coral-500 text-coral-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-coral-50 transition-all duration-200"
            >
              Learn more
            </button>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="relative">
          <div class="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/placeholder.svg?height=600&width=1200" 
              alt="Students celebrating graduation" 
              class="w-full h-96 md:h-[600px] object-cover"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div ref="featuresSection" class="bg-white py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How Lnaid Works</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Three simple ways to make education accessible for everyone</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-12">
          <!-- Student Appeals -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-coral-100 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-coral-200 transition-colors duration-200">
              <svg class="w-10 h-10 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Student Appeals</h3>
            <p class="text-gray-600 text-lg leading-relaxed">Students create funding appeals for their education needs and innovative ideas</p>
          </div>

          <!-- Sponsor Offers -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-coral-100 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-coral-200 transition-colors duration-200">
              <svg class="w-10 h-10 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Sponsor Offers</h3>
            <p class="text-gray-600 text-lg leading-relaxed">Sponsors create targeted offers based on criteria like schools, courses, and academic levels</p>
          </div>

          <!-- Scholarships -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-coral-100 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-coral-200 transition-colors duration-200">
              <svg class="w-10 h-10 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Full Scholarships</h3>
            <p class="text-gray-600 text-lg leading-relaxed">Comprehensive scholarship management with applications, tests, and document submissions</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-gray-900 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl md:text-5xl font-bold text-white mb-3">2,500+</div>
            <div class="text-gray-300 text-lg">Students Funded</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold text-white mb-3">₦50M+</div>
            <div class="text-gray-300 text-lg">Total Donations</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold text-white mb-3">800+</div>
            <div class="text-gray-300 text-lg">Active Sponsors</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold text-white mb-3">95%</div>
            <div class="text-gray-300 text-lg">Success Rate</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Stories -->
    <div class="bg-gray-50 py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Success Stories</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Real students whose lives have been transformed through community support</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center mb-6">
              <img src="/placeholder.svg?height=60&width=60" alt="Student" class="w-15 h-15 rounded-full mr-4">
              <div>
                <h4 class="text-xl font-bold text-gray-900">Adaora Okafor</h4>
                <p class="text-gray-600">Computer Science, University of Lagos</p>
              </div>
            </div>
            <p class="text-gray-700 mb-6 text-lg leading-relaxed">"Thanks to Lnaid, I was able to purchase the necessary equipment for my final year project. The support from the community has been incredible!"</p>
            <div class="text-coral-500 font-semibold">Funded: ₦120,000 for research equipment</div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center mb-6">
              <img src="/placeholder.svg?height=60&width=60" alt="Student" class="w-15 h-15 rounded-full mr-4">
              <div>
                <h4 class="text-xl font-bold text-gray-900">Ibrahim Musa</h4>
                <p class="text-gray-600">Medicine, Ahmadu Bello University</p>
              </div>
            </div>
            <p class="text-gray-700 mb-6 text-lg leading-relaxed">"The scholarship program changed my life. I can now focus on my studies without worrying about tuition fees."</p>
            <div class="text-coral-500 font-semibold">Received: Full tuition scholarship</div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center mb-6">
              <img src="/placeholder.svg?height=60&width=60" alt="Student" class="w-15 h-15 rounded-full mr-4">
              <div>
                <h4 class="text-xl font-bold text-gray-900">Chioma Eze</h4>
                <p class="text-gray-600">Engineering, University of Nigeria</p>
              </div>
            </div>
            <p class="text-gray-700 mb-6 text-lg leading-relaxed">"The mentorship and funding I received helped me develop my innovative water purification system."</p>
            <div class="text-coral-500 font-semibold">Funded: ₦200,000 for innovation project</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-white py-24">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Make a Difference?</h2>
        <p class="text-xl text-gray-600 mb-12 leading-relaxed">Join thousands of students and sponsors who are transforming education together</p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <router-link 
            to="/auth/register" 
            class="bg-coral-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-coral-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Join as Student
          </router-link>
          <router-link 
            to="/auth/register" 
            class="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Become a Sponsor
          </router-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '../components/Layout.vue'

const featuresSection = ref(null)

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
