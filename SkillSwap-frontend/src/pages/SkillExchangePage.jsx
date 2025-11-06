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
//     "All",
//     "Programming",
//     "Design",
//     "Marketing",
//     "Photography",
//     "Music",
//     "Art",
//     "Writing",
//     "Business",
//     "Languages",
//     "Cooking",
//     "Fitness",
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
//         if (selectedCategory !== "All")
//           params.append("category", selectedCategory);
//         if (skillOfferedQuery)
//           params.append("skill_offered", skillOfferedQuery);
//         if (skillWantedQuery) params.append("skill_wanted", skillWantedQuery);
//         const response = await api.get("/api/skill-exchange/listings", {
//           params,
//         });
//         setListings(response.data);
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.detail ||
//           err.message ||
//           "Failed to fetch listings.";
//         setError(errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     performFetch();
//   }, [
//     user,
//     authLoading,
//     selectedCategory,
//     skillOfferedQuery,
//     skillWantedQuery,
//   ]);

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
//       return (
//         <div className="text-center p-10 text-slate-400">
//           Loading listings...
//         </div>
//       );
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
//               <h3 className="font-semibold text-slate-200">
//                 {listing.user.name}
//               </h3>
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
//               View Details
//             </button>
//             <button
//               onClick={() => handleLikeToggle(listing.id, listing.is_liked)}
//               className={`px-3 py-2 border rounded-full transition-all duration-300 ${
//                 listing.is_liked
//                   ? "border-red-500 bg-red-500/20 text-red-400"
//                   : "border-slate-600 text-slate-300 hover:bg-slate-700/50"
//               }`}
//             >
//               <Heart
//                 className={`h-5 w-5 ${listing.is_liked ? "fill-current" : ""}`}
//               />
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
//               <h1 className="text-4xl font-bold text-white mb-2">
//                 Skill Exchange
//               </h1>
//               <p className="text-slate-400">
//                 Connect with others for one-on-one skill swapping
//               </p>
//             </div>
//             <button
//               onClick={() => setIsCreateModalOpen(true)}
//               className="mt-4 lg:mt-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 transform transition-transform duration-300 flex items-center space-x-2"
//             >
//               <Plus className="h-5 w-5" />
//               <span>Post Your Skills</span>
//             </button>
//           </div>
//           <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 shadow-lg mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">
//                   Category
//                 </label>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 >
//                   {skillCategories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">
//                   Skill Offered
//                 </label>
//                 <input
//                   type="text"
//                   value={skillOfferedQuery}
//                   onChange={(e) => setSkillOfferedQuery(e.target.value)}
//                   placeholder="e.g., React Development"
//                   className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">
//                   Skill Wanted
//                 </label>
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
//             <p className="text-slate-400">
//               Showing {listings.length} skill exchange opportunities
//             </p>
//           </div>
//           <div className="space-y-6">{renderContent()}</div>
//         </div>
//       </div>
//       {/* ✅ When a listing is selected, open chat */}
//       {selectedListing && (
//         <>
//           <UserDetailModal
//             listing={selectedListing}
//             onClose={() => setSelectedListing(null)}
//           />
//           <ChatBox
//             roomId={`room_${[user?.id, selectedListing.user.id]
//               .sort()
//               .join("_")}`}
//             partnerName={selectedListing.user.name}
//             onClose={() => setSelectedListing(null)}
//           />
//         </>
//       )}

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
import { Plus, Star, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import CreateListingModal from "../components/CreateListingModal";
import UserDetailModal from "../components/UserDetailModal";
import ChatBox from "../components/ChatBox"; // ✅ NEW IMPORT

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
      return <div className="text-center p-10 text-slate-400">Loading listings...</div>;
    }
    if (error) {
      return (
        <div className="text-center p-10 text-red-400 bg-slate-800/50 border border-red-500/30 rounded-xl">
          {error}
        </div>
      );
    }
    if (listings.length === 0) {
      return (
        <div className="text-center p-10 text-slate-400 bg-slate-800/50 rounded-xl">
          No skill exchange opportunities found. Be the first to post!
        </div>
      );
    }

    return listings.map((listing) => (
      <div
        key={listing.id}
        className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 shadow-lg hover:border-purple-500 transition-all duration-300"
      >
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex items-center space-x-4 lg:w-64">
            <img
              src={listing.user.avatar || "/api/placeholder/60/60"}
              alt={listing.user.name}
              className="h-14 w-14 rounded-full border border-slate-600"
            />
            <div>
              <h3 className="font-semibold text-slate-200">{listing.user.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{listing.user.rating || 4.8}</span>
                <span>• Level {listing.user.level}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 lg:flex lg:items-center lg:space-x-6">
            <div className="grid md:grid-cols-2 gap-4 lg:flex-1">
              <div>
                <p className="text-sm text-slate-400 mb-1">Offering</p>
                <div className="bg-green-500/20 text-green-300 px-3 py-2 rounded-lg font-medium text-center border border-green-500/30">
                  {listing.skill_offered}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Looking for</p>
                <div className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg font-medium text-center border border-blue-500/30">
                  {listing.skill_wanted}
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 lg:w-48 justify-end">
            <button
              onClick={() => setSelectedListing(listing)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full font-medium shadow-lg shadow-purple-500/20 hover:scale-105 transform transition-transform duration-300"
            >
              Chat / Details
            </button>
            <button
              onClick={() => handleLikeToggle(listing.id, listing.is_liked)}
              className={`px-3 py-2 border rounded-full transition-all duration-300 ${
                listing.is_liked
                  ? "border-red-500 bg-red-500/20 text-red-400"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700/50"
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
      <div className="bg-slate-900 min-h-screen text-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Skill Exchange</h1>
              <p className="text-slate-400">Connect with others for one-on-one skill swapping</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 lg:mt-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 transform transition-transform duration-300 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Post Your Skills</span>
            </button>
          </div>

          {/* Filter section */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {skillCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Skill Offered</label>
                <input
                  type="text"
                  value={skillOfferedQuery}
                  onChange={(e) => setSkillOfferedQuery(e.target.value)}
                  placeholder="e.g., React Development"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Skill Wanted</label>
                <input
                  type="text"
                  value={skillWantedQuery}
                  onChange={(e) => setSkillWantedQuery(e.target.value)}
                  placeholder="e.g., UI/UX Design"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-slate-400">Showing {listings.length} skill exchange opportunities</p>
          </div>

          <div className="space-y-6">{renderContent()}</div>
        </div>
      </div>

      {/* ✅ Open chat box for selected listing */}
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
    </>
  );
};

export default SkillExchangePage;
