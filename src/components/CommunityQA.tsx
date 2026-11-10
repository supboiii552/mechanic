import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  CheckCircle2, 
  Send, 
  User, 
  Car, 
  BadgeCheck, 
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { CommunityPost } from '../types';
import { fetchCommunityDiagnosticLogs } from '../services/community';

export const CommunityQA: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // "Ask a Master Tech" Form State
  const [askModalOpen, setAskModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [questionTitle, setQuestionTitle] = useState<string>('');
  const [questionDetails, setQuestionDetails] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      try {
        const data = await fetchCommunityDiagnosticLogs();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching logs:', err);
      } finally {
        setLoading(false);
      }
    };
    loadLogs();
  }, []);

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !vehicleModel || !questionTitle || !questionDetails) return;

    setSubmitting(true);
    setTimeout(() => {
      const newPost: CommunityPost = {
        id: Date.now(),
        title: questionTitle,
        body: questionDetails,
        author: userName,
        vehicleModel: vehicleModel,
        serviceCategory: 'Direct Technician Inquiry',
        mileage: 52000,
        verifiedRepair: true,
        repliesCount: 1,
        solved: true,
        date: 'Just now',
        comments: [
          {
            id: Date.now() + 1,
            postId: Date.now(),
            name: 'Sarah Chen',
            email: 's.chen@apexautocare.com',
            body: `Master Tech Analysis: Based on the symptom described on your ${vehicleModel}, check the high-pressure fuel rail and ignition coil resistance. Our OBD-II diagnostic tool can isolate cylinder-specific misfire counts in under 30 minutes.`,
            isMasterTech: true,
            badge: 'ASE Master Diagnostic Tech'
          }
        ]
      };

      setPosts([newPost, ...posts]);
      setSubmitting(false);
      setAskModalOpen(false);
      setUserName('');
      setVehicleModel('');
      setQuestionTitle('');
      setQuestionDetails('');
    }, 600);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && post.serviceCategory.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <section id="community" className="py-16 lg:py-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>Verified Case Logs · JSONPlaceholder API Live Feed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 [text-wrap:balance]">
              Master Technician Case Records & Diagnostic Q&A
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
              Real repair case studies with oscilloscope readings, technical findings, and direct answers from our ASE Master Diagnostic crew.
            </p>
          </div>

          <button
            onClick={() => setAskModalOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-all whitespace-nowrap self-start md:self-auto cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask a Master Technician</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by vehicle (e.g. BMW, RAV4), symptom, or fault code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'Diagnostics', 'Brake', 'Alignment', 'Battery'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Systems' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 animate-pulse space-y-4">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
                <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <Car className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200">No matching diagnostic records found</p>
            <p className="text-xs text-neutral-500 mt-1">Try another search term or click "Ask a Master Technician" above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between shadow-sm card-glow-hover"
              >
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">{post.vehicleModel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{post.mileage.toLocaleString()} mi</span>
                    </div>
                    <span className="text-[11px] font-mono">{post.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                    {post.body}
                  </p>
                </div>

                {/* Master Tech Response Strip */}
                {post.comments && post.comments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-3.5 rounded-xl text-xs ${
                          comment.isMasterTech
                            ? 'bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-neutral-800 dark:text-neutral-200'
                            : 'bg-neutral-50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white">
                            {comment.isMasterTech && <BadgeCheck className="w-4 h-4 text-amber-500" />}
                            <span>{comment.name}</span>
                          </div>
                          {comment.badge && (
                            <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400">
                              {comment.badge}
                            </span>
                          )}
                        </div>
                        <p className="leading-relaxed text-xs text-neutral-600 dark:text-neutral-300">
                          {comment.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal: Ask a Master Tech */}
        {askModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl relative">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                    Direct Diagnostic Question
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Reviewed by ASE Certified technicians on duty.
                  </p>
                </div>
              </div>

              <form onSubmit={handleAskSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Miller"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Vehicle Year, Make & Model
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2020 Subaru Outback 2.5i"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Summary of Issue or Noise
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vibration in steering wheel over 65 MPH and slight pull right"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Detailed Symptoms (RPM, cold start, warning lights)
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe when the symptom occurs, weather conditions, previous repairs..."
                    value={questionDetails}
                    onChange={(e) => setQuestionDetails(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setAskModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Submitting to Tech...' : 'Submit to Master Tech'}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
