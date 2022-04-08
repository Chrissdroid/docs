import type { SIDEBAR } from '../config';
type LanguagesInUse = keyof typeof SIDEBAR;

const en = {
	// Left Sidebar tab headings
	'leftSidebar.learnTab': 'Learn',
	'leftSidebar.referenceTab': 'Reference',
	// Right Sidebar
	'rightSidebar.onThisPage': 'On this page',
	'rightSidebar.overview': 'Overview',
	'rightSidebar.more': 'More',
	'rightSidebar.editPage': 'Edit this page',
	'rightSidebar.translatePage': 'Translate this page',
	'rightSidebar.joinCommunity': 'Join our community',
	// Used in previous/next page links at the bottom of pages
	'articleNav.nextPage': 'Next Page',
	'articleNav.prevPage': 'Back',
	// Used in `<Since>`: Added in: v0.24.0 [NEW]
	'since.addedIn': 'Added in:',
	'since.new': 'New',
	// `<ContributorList>` fallback text
	'contributors.seeAll': 'See all contributors',
};

const checkLanguages = <T extends Record<LanguagesInUse, Partial<typeof en>>>(config: T): T => config;

export const translations = checkLanguages({
	en,
	de: {},
	nl: {},
	'pt-BR': {},
	fi: {},
	es: {},
	'zh-CN': {},
	'zh-TW': {},
	bg: {},
	fr: {
		'a11y.skipLink': 'Aller au contenu principal',
		'navbar.a11yTitle': 'Navigation principale',
		// Site settings
		'site.title': 'Documentation Astro',
		'site.description': 'Compilez des sites plus rapidement avec moins de JavaScript pour vos utilisateurs.',
		// Left Sidebar
		'leftSidebar.a11yTitle': 'Navigation du site',
		'leftSidebar.learnTab': 'Apprendre',
		'leftSidebar.referenceTab': 'Référence',
		'leftSidebar.noTranslations': 'Aucune traduction trouvée.',
		'leftSidebar.viewInEnglish': 'Voir en anglais',
		// Right Sidebar
		'rightSidebar.a11yTitle': 'Table des matières',
		'rightSidebar.onThisPage': 'Sur cette page',
		'rightSidebar.overview': 'Vue générale',
		'rightSidebar.more': 'Plus',
		'rightSidebar.editPage': 'Modifier cette page',
		'rightSidebar.translatePage': 'Traduire cette page',
		'rightSidebar.joinCommunity': 'Rejoindre notre communauté',
		// Used in previous/next page links at the bottom of pages
		'articleNav.nextPage': 'Page suivante',
		'articleNav.prevPage': 'Page précédente',
		// Used in `<Since>`: Added in: v0.24.0 [NEW]
		'since.addedIn': 'Ajouté à la version :',
		'since.new': 'Nouveau',
		// Installation Guide
		'install.autoTab': 'Automatiquement via l\'ILC',
		'install.manualTab': 'Configuration manuelle',
	},
	bn: {},
	kr: {},
	ar: {
		'leftSidebar.learnTab': 'تَعلَم',
		'leftSidebar.referenceTab': 'مرجع',
		'rightSidebar.onThisPage': 'في الصفحة الحالية',
		'rightSidebar.overview': 'نظرة عامة',
		'rightSidebar.more': 'المزيد',
		'rightSidebar.editPage': 'عدل هذه الصفحة',
		'rightSidebar.translatePage': 'ترجم هذه الصفحة',
		'rightSidebar.joinCommunity': 'انضم إلى مُجتمعنا',
		'articleNav.nextPage': 'الصفحة التالية',
		'articleNav.prevPage': 'عودة',
		'since.addedIn': 'أُضيفت في:',
		'since.new': 'جديدة',
	},
	da: {},
	ja: {},
	ru: {},
	it: {},
	pl: {},
	hu: {},
});
