# 🤝 Contributing to InSpotGO

## ⚠️ **CRITICAL: Documentation is LIVING**

> **FOR AI ASSISTANTS & DEVELOPERS:**  
> Every change to this project MUST update the living documentation in `/docs`

---

## 📝 Documentation Update Rules

### **MANDATORY UPDATES:**

When you make changes, you **MUST** update:

#### 🎨 **If Branding Changes:**
```
✅ Update: docs/BRANDING.md
✅ Update: docs/CHANGELOG.md
❌ NEVER delete previous versions
✅ ALWAYS add new version to history
```

#### 🔧 **If Code/Features Change:**
```
✅ Update: docs/CHANGELOG.md
✅ Add entry at TOP (not bottom)
✅ Increment version number
✅ Categorize: Added/Changed/Fixed/Removed
```

#### 📚 **If Adding New Docs:**
```
✅ Update: docs/README.md
✅ Update: docs/CHANGELOG.md
✅ Link from main README if relevant
```

---

## 🤖 For AI Assistants

### **Before ANY code change:**
1. Check if change affects branding → Update `docs/BRANDING.md`
2. Check if change is production-worthy → Update `docs/CHANGELOG.md`
3. Always preserve history → NEVER delete old versions

### **Pattern to Follow:**
```bash
# 1. Make change
git commit -m "feat: new feature"

# 2. Update CHANGELOG (REQUIRED!)
git commit -m "docs: update changelog v1.x.x"

# 3. Update BRANDING if needed
git commit -m "docs: update branding guide"
```

---

## 👤 For Developers

### **Standard Workflow:**

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make your changes
# ... code changes ...

# 3. Update documentation (REQUIRED!)
vim docs/CHANGELOG.md  # Add your changes

# 4. Commit everything
git add .
git commit -m "feat: add new feature"
git commit -m "docs: update changelog for v1.x.x"

# 5. Push and PR
git push origin feature/new-feature
```

---

## 📊 Version Numbers

```
MAJOR.MINOR.PATCH

Examples:
1.0.0 → 1.0.1  (bug fix)
1.0.1 → 1.1.0  (new feature)
1.1.0 → 2.0.0  (breaking change)
```

---

## ✅ Pull Request Checklist

Before submitting PR:

- [ ] Code changes committed
- [ ] `docs/CHANGELOG.md` updated with changes
- [ ] Version number incremented
- [ ] `docs/BRANDING.md` updated (if branding changed)
- [ ] Previous versions preserved (not deleted)
- [ ] Tests passing (if applicable)
- [ ] Documentation is clear and helpful

---

## 🚨 Common Mistakes

### **❌ DON'T:**
- Skip documentation updates
- Delete old changelog entries
- Replace BRANDING.md (add to it instead)
- Use vague descriptions
- Forget version numbers

### **✅ DO:**
- Update docs with every change
- Add new versions at top
- Preserve all history
- Be specific and clear
- Follow semantic versioning

---

## 📂 Documentation Structure

All documentation lives in `/docs`:

```
docs/
├── README.md        ← How to update docs (read this!)
├── BRANDING.md      ← Logo, colors, brand specs
└── CHANGELOG.md     ← Version history (update often!)
```

**➡️ READ:** `/docs/README.md` for detailed instructions

---

## 🔗 Quick Links

- [Documentation Guide](/docs/README.md) ← **START HERE**
- [Branding Specs](/docs/BRANDING.md)
- [Project History](/docs/CHANGELOG.md)

---

## ❓ Questions?

**Unsure if you should update docs?**

🟢 **YES, UPDATE!**  
When in doubt, always update. Over-documenting > Under-documenting.

**Which file to update?**
- Changed design? → `BRANDING.md` + `CHANGELOG.md`
- Added feature? → `CHANGELOG.md`
- Fixed bug? → `CHANGELOG.md`
- New docs? → `docs/README.md` + `CHANGELOG.md`

---

## 🌟 Remember

> "Documentation is not an afterthought - it's part of the code."

**These rules exist to:**
- ✅ Preserve project history
- ✅ Help future contributors
- ✅ Make AI assistants effective
- ✅ Track decision-making
- ✅ Create institutional knowledge

---

**Thank you for contributing! 🚀**

---

**Last Updated:** February 10, 2026  
**Maintained by:** InSpotGO Team
