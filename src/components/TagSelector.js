import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TagSelector = forwardRef(({ onTagSelect }, ref) => {
    const [selectedTag, setSelectedTag] = useState(null);
    const [customTags, setCustomTags] = useState({});
    const [newTag, setNewTag] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAddingCustomSkill, setIsAddingCustomSkill] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState({});

    const skillsData = {
        "Software Engineering": ["JavaScript", "Python", "C++", "SQL", "Docker", 'AWS', 'REST API', 'GraphQL', 'React.js', 'git', 'ML', 'DL', 'Pytorch', 'NLP', 'Computer Vision'],
        "Finance": ["Accounting", "Economics", "Banking"],
        "Sales": ["Negotiation", "CRM", "Lead Generation"],
        // Add more general tags and skills as needed
    };

    const toggleExpand = (tag) => {
        const shouldExpand = selectedTag !== tag || !isExpanded;
        setIsExpanded(shouldExpand);
        setSelectedTag(shouldExpand ? tag : null);
    };

    const getColorForTag = (tag) => {
        const colors = {
            "Software Engineering": "#007bff",
            "Finance": "#007bff", // 28a745
            "Sales": "#007bff",
            // Add more mappings as needed
        };
        return colors[tag] || "#000000"; // Default color if no match is found
    };

    const handleSkillSelect = (tag, skill, event) => {
        event.stopPropagation();
        const skills = selectedSkills[tag] || [];
        if (skills.includes(skill)) {
            setSelectedSkills({ ...selectedSkills, [tag]: skills.filter(s => s !== skill) });
        } else {
            setSelectedSkills({ ...selectedSkills, [tag]: [...skills, skill] });
        }
    };


    const handleAddTag = (tag) => {
        if (newTag && !customTags[tag]?.includes(newTag)) {
            setCustomTags({
                ...customTags,
                [tag]: [...(customTags[tag] || []), newTag]
            });
            setNewTag('');
            setIsAddingCustomSkill(false);
        }
    };

    const handleAddCustomSkillClick = (event) => {
        event.stopPropagation()
        setIsAddingCustomSkill(true);
    };

    const handleCustomSkillSubmit = (e) => {
        if (e.key === 'Enter' && newTag) {
            handleAddTag(selectedTag);
        }
    };

    useImperativeHandle(ref, () => ({
        getSelectedSkills: () => selectedSkills
    }));

    return (
        <div className="tags-container">
            {Object.keys(skillsData).map((tag) => (
                <div key={tag}>
                    <button type="button" className="tag-button" onClick={() => toggleExpand(tag)}>
                        {tag}
                    </button>
                    <AnimatePresence>
                        {isExpanded && selectedTag === tag && (
                            <motion.div
                                initial={{ width: 'initial' }}
                                animate={{ width: '100%' }}
                                exit={{ width: 'initial' }}
                                className="tag-frame"
                                style={{ borderColor: getColorForTag(tag) }}
                            >
                                <div className="tag-skills">
                                    {[...(skillsData[tag] || []), ...(customTags[tag] || [])].map((skill) => (
                                        <button
                                            type="button"  // Specify button type here
                                            key={skill}
                                            onClick={(e) => handleSkillSelect(tag, skill, e)}
                                            className={`skill-tag ${selectedSkills[tag]?.includes(skill) ? 'selected' : ''}`}
                                        >
                                            {skill}
                                        </button>
                                    ))}
                                    {isAddingCustomSkill ? (
                                        <input
                                            type="text"
                                            className="custom-skill-input"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyDown={handleCustomSkillSubmit}
                                            onBlur={() => setIsAddingCustomSkill(false)}
                                            autoFocus
                                        />
                                    ) : (
                                        <div onClick={handleAddCustomSkillClick} className="add-skill-tag">
                                            + Add Your Skill
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
});

export default TagSelector;
