// import React, { useState, useEffect } from "react";
// import { Plus, Star, Heart } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/axios";
// import CreateListingModal from "../components/CreateListingModal";
// import UserDetailModal from "../components/UserDetailModal";

// const SkillExchangePage = () => {
//   const { user, loading: authLoading } = useAuth();
//   const [listings, setListings] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [selectedListing, setSelectedListing] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [skillOfferedQuery, setSkillOfferedQuery] = useState("");
//   const [skillWantedQuery, setSkillWantedQuery] = useState("");

//   const skillCategories = [
//     "All", "Programming", "Design", "Marketing", "Photography", "Music",
//     "Art", "Writing", "Business", "Languages", "Cooking", "Fitness",
//   ];

//   useEffect(() => {
//     const performFetch = async () => {
//       if (authLoading) return;
//       if (!user) {
//         setError("Please log in to view skill exchanges.");
//         setIsLoading(false);
//         return;
//       }
//       setIsLoading(true);
//       setError(null);
//       try {
//         const params = new URLSearchParams();
//         if (selectedCategory !== "All") params.append("category", selectedCategory);
//         if (skillOfferedQuery) params.append("skill_offered", skillOfferedQuery);
//         if (skillWantedQuery) params.append("skill_wanted", skillWantedQuery);
//         const response = await api.get("/api/skill-exchange/listings", { params });
//         setListings(response.data);
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.detail || err.message || "Failed to fetch listings.";
//         setError(errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     performFetch();
//   }, [user, authLoading, selectedCategory, skillOfferedQuery, skillWantedQuery]);

//   const handleListingCreated = (newListing) => {
//     setListings((prevListings) => [
//       { ...newListing, is_liked: false },
//       ...prevListings,
//     ]);
//   };

//   const handleLikeToggle = async (listingId, isCurrentlyLiked) => {
//     const originalListings = listings;
//     setListings(
//       listings.map((l) =>
//         l.id === listingId ? { ...l, is_liked: !isCurrentlyLiked } : l
//       )
//     );
//     try {
//       if (isCurrentlyLiked) {
//         await api.delete(`/api/skill-exchange/listings/${listingId}/like`);
//       } else {
//         await api.post(`/api/skill-exchange/listings/${listingId}/like`);
//       }
//     } catch (error) {
//       console.error("Failed to update like status:", error);
//       setListings(originalListings);
//     }
//   };

//   const renderContent = () => {
//     if (isLoading || authLoading) {
//       return <div className="text-center p-10 text-slate-400">Loading listings...</div>;
//     }
//     if (error) {
//       return (
//         <div className="text-center p-10 text-red-400 bg-slate-800/50 border border-red-500/30 rounded-xl">
//           {error}
//         </div>
//       );
//     }
//     if (listings.length === 0) {
//       return (
//         <div className="text-center p-10 text-slate-400 bg-slate-800/50 rounded-xl">
//           No skill exchange opportunities found. Be the first to post!
//         </div>
//       );
//     }

//     return listings.map((listing) => (
//       <div
//         key={listing.id}
//         className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 shadow-lg hover:border-purple-500 transition-all duration-300"
//       >
//         <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
//           <div className="flex items-center space-x-4 lg:w-64">
//             <img
//               src={listing.user.avatar || "/api/placeholder/60/60"}
//               alt={listing.user.name}
//               className="h-14 w-14 rounded-full border border-slate-600"
//             />
//             <div>
//               <h3 className="font-semibold text-slate-200">{listing.user.name}</h3>
//               <div className="flex items-center space-x-2 text-sm text-slate-400">
//                 <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                 <span>{listing.user.rating || 4.8}</span>
//                 <span>• Level {listing.user.level}</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex-1 lg:flex lg:items-center lg:space-x-6">
//             <div className="grid md:grid-cols-2 gap-4 lg:flex-1">
//               <div>
//                 <p className="text-sm text-slate-400 mb-1">Offering</p>
//                 <div className="bg-green-500/20 text-green-300 px-3 py-2 rounded-lg font-medium text-center border border-green-500/30">
//                   {listing.skill_offered}
//                 </div>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-400 mb-1">Looking for</p>
//                 <div className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg font-medium text-center border border-blue-500/30">
//                   {listing.skill_wanted}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex space-x-2 lg:w-48 justify-end">
//             <button
//               onClick={() => setSelectedListing(listing)}
//               className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full font-medium shadow-lg shadow-purple-500/20 hover:scale-105 transform transition-transform duration-300"
//             >
//               Chat / Details
//             </button>
//             <button
//               onClick={() => handleLikeToggle(listing.id, listing.is_liked)}
//               className={`px-3 py-2 border rounded-full transition-all duration-300 ${
//                 listing.is_liked
//                   ? "border-red-500 bg-red-500/20 text-red-400"
//                   : "border-slate-600 text-slate-300 hover:bg-slate-700/50"
//               }`}
//             >
//               <Heart className={`h-5 w-5 ${listing.is_liked ? "fill-current" : ""}`} />
//             </button>
//           </div>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <>
//       <div className="bg-slate-900 min-h-screen text-slate-200 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
//             <div>
//               <h1 className="text-4xl font-bold text-white mb-2">Skill Exchange</h1>
//               <p className="text-slate-400">Connect with others for one-on-one skill swapping</p>
//             </div>
//             <button
//               onClick={() => setIsCreateModalOpen(true)}
//               className="mt-4 lg:mt-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 transform transition-transform duration-300 flex items-center space-x-2"
//             >
//               <Plus className="h-5 w-5" />
//               <span>Post Your Skills</span>
//             </button>
//           </div>

//           {/* Filter section */}
//           <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 shadow-lg mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 >
//                   {skillCategories.map((category) => (
//                     <option key={category} value={category}>{category}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Skill Offered</label>
//                 <input
//                   type="text"
//                   value={skillOfferedQuery}
//                   onChange={(e) => setSkillOfferedQuery(e.target.value)}
//                   placeholder="e.g., React Development"
//                   className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Skill Wanted</label>
//                 <input
//                   type="text"
//                   value={skillWantedQuery}
//                   onChange={(e) => setSkillWantedQuery(e.target.value)}
//                   placeholder="e.g., UI/UX Design"
//                   className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mb-6">
//             <p className="text-slate-400">Showing {listings.length} skill exchange opportunities</p>
//           </div>

//           <div className="space-y-6">{renderContent()}</div>
//         </div>
//       </div>

//       {/* ✅ Open chat box for selected listing */}
// {selectedListing && (
//   <UserDetailModal
//     listing={selectedListing}
//     onClose={() => setSelectedListing(null)}
//   />
// )}

//       <CreateListingModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onListingCreated={handleListingCreated}
//       />
//     </>
//   );
// };

// export default SkillExchangePage;


import React, { useState, useEffect } from "react";
import { Plus, Star, Heart, Search, Sparkles, Users, TrendingUp, Filter } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import CreateListingModal from "../components/CreateListingModal";
import UserDetailModal from "../components/UserDetailModal";

const SkillExchangePage = () => {
  const { user, loading: authLoading } = useAuth();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [skillOfferedQuery, setSkillOfferedQuery] = useState("");
  const [skillWantedQuery, setSkillWantedQuery] = useState("");

  const skillCategories = [
    "All", "Programming", "Design", "Marketing", "Photography", "Music",
    "Art", "Writing", "Business", "Languages", "Cooking", "Fitness",
  ];

  useEffect(() => {
    const performFetch = async () => {
      if (authLoading) return;
      if (!user) {
        setError("Please log in to view skill exchanges.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "All") params.append("category", selectedCategory);
        if (skillOfferedQuery) params.append("skill_offered", skillOfferedQuery);
        if (skillWantedQuery) params.append("skill_wanted", skillWantedQuery);
        const response = await api.get("/api/skill-exchange/listings", { params });
        setListings(response.data);
      } catch (err) {
        const errorMessage =
          err.response?.data?.detail || err.message || "Failed to fetch listings.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    performFetch();
  }, [user, authLoading, selectedCategory, skillOfferedQuery, skillWantedQuery]);

  const handleListingCreated = (newListing) => {
    setListings((prevListings) => [
      { ...newListing, is_liked: false },
      ...prevListings,
    ]);
  };

  const handleLikeToggle = async (listingId, isCurrentlyLiked) => {
    const originalListings = listings;
    setListings(
      listings.map((l) =>
        l.id === listingId ? { ...l, is_liked: !isCurrentlyLiked } : l
      )
    );
    try {
      if (isCurrentlyLiked) {
        await api.delete(`/api/skill-exchange/listings/${listingId}/like`);
      } else {
        await api.post(`/api/skill-exchange/listings/${listingId}/like`);
      }
    } catch (error) {
      console.error("Failed to update like status:", error);
      setListings(originalListings);
    }
  };

  const renderContent = () => {
    if (isLoading || authLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-purple-600 animate-pulse" />
          </div>
          <p className="mt-6 text-gray-600 font-medium">Finding perfect matches...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center p-12 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border-2 border-red-200">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold text-lg">{error}</p>
        </div>
      );
    }
    
    if (listings.length === 0) {
      return (
        <div className="text-center p-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-dashed border-purple-300">
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-10 w-10 text-purple-600" />
          </div>
          <p className="text-gray-600 font-medium text-lg mb-2">No skill exchanges found</p>
          <p className="text-gray-500 mb-6">Be the first to create a skill exchange opportunity!</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Post Your Skills
          </button>
        </div>
      );
    }

    return listings.map((listing, index) => (
      <div
        key={listing.id}
        style={{ animationDelay: `${index * 100}ms` }}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-purple-300 transition-all duration-300 hover:-translate-y-1 animate-fadeInUp"
      >
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          {/* User Info */}
          <div className="flex items-center space-x-4 lg:w-64">
            <div className="relative">
              <img
                src={listing.user.avatar || "https://i.pravatar.cc/60"}
                alt={listing.user.name}
                className="h-16 w-16 rounded-full border-3 border-purple-200 hover:border-purple-400 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full p-1 border-2 border-white">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg hover:text-purple-600 transition-colors cursor-pointer">
                {listing.user.name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                  <span className="font-medium">{listing.user.rating || 4.8}</span>
                </div>
                <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                  Level {listing.user.level}
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="flex-1 lg:flex lg:items-center lg:space-x-6">
            <div className="grid md:grid-cols-2 gap-4 lg:flex-1">
              <div>
                <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">Offering</p>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-3 rounded-xl font-semibold text-center border-2 border-green-200 hover:scale-105 transition-transform duration-300">
                  {listing.skill_offered}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">Looking for</p>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-3 rounded-xl font-semibold text-center border-2 border-blue-200 hover:scale-105 transition-transform duration-300">
                  {listing.skill_wanted}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 lg:w-auto justify-end">
            <button
              onClick={() => setSelectedListing(listing)}
              className="flex-1 lg:flex-initial bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              View Details
            </button>
            <button
              onClick={() => handleLikeToggle(listing.id, listing.is_liked)}
              className={`px-4 py-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                listing.is_liked
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                  : "bg-white border-2 border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500"
              }`}
            >
              <Heart className={`h-5 w-5 ${listing.is_liked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 flex items-center gap-3">
                  Skill Exchange
                  <TrendingUp className="h-9 w-9 text-purple-600 animate-pulse" />
                </h1>
                <p className="text-gray-600 text-lg">Connect with others for one-on-one skill swapping</p>
              </div>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Post Your Skills</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Active Listings</p>
                  <p className="text-3xl font-bold text-purple-600">{listings.length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-4 rounded-xl">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Skills Available</p>
                  <p className="text-3xl font-bold text-green-600">{skillCategories.length - 1}</p>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-xl">
                  <Sparkles className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Matches Today</p>
                  <p className="text-3xl font-bold text-blue-600">24</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-xl">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-purple-300 transition-all duration-300 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900">Find Your Perfect Match</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 cursor-pointer"
                >
                  {skillCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Skill Offered Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Offered</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={skillOfferedQuery}
                    onChange={(e) => setSkillOfferedQuery(e.target.value)}
                    placeholder="e.g., React Development"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                  />
                </div>
              </div>

              {/* Skill Wanted Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Wanted</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={skillWantedQuery}
                    onChange={(e) => setSkillWantedQuery(e.target.value)}
                    placeholder="e.g., UI/UX Design"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== 'All' || skillOfferedQuery || skillWantedQuery) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')} className="hover:text-purple-600">×</button>
                  </span>
                )}
                {skillOfferedQuery && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Offers: {skillOfferedQuery}
                    <button onClick={() => setSkillOfferedQuery('')} className="hover:text-green-600">×</button>
                  </span>
                )}
                {skillWantedQuery && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Wants: {skillWantedQuery}
                    <button onClick={() => setSkillWantedQuery('')} className="hover:text-blue-600">×</button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-purple-600 font-bold">{listings.length}</span> skill exchange{listings.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Listings */}
          <div className="space-y-6">{renderContent()}</div>
        </div>
      </div>

      {/* Modals */}
      {selectedListing && (
        <UserDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}

      <CreateListingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onListingCreated={handleListingCreated}
      />

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default SkillExchangePage;