---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme-without-fonts'

const members = [
  {
    avatar: 'https://github.com/arielsalminen.png',
    name: 'Ariel Salminen',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/arielsalminen' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/arielsalminen.com' },
      { icon: 'mastodon', link: 'https://front-end.social/@ariel' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/arielsalminen/' }
    ]
  },
  {
    avatar: 'https://github.com/getelena.png',
    name: 'You?',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/getelena/elena' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Meet the team
    </template>
    <template #lead>
      The development of Elena is guided by an international team that is actively involved in the maintenance of the core project.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
</VPTeamPage>