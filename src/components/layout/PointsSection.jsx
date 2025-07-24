import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

const tabList = [
  { value: 'all', label: 'TOUS LES JOUEURS' },
  { value: 'def', label: 'GAR. ET DÉF.' },
  { value: 'att', label: 'MIL. ET ATT.' },
];

const allRows = [
  { label: "APPARITION (JUSQU’À 60 MIN)", value: "+1" },
  { label: "APPARITION (60 MINUTES OU PLUS)", value: "+2" },
  { label: "BUT CONTRE SON CAMP", value: "-3" },
  { label: "CARTON JAUNE", value: "-1" },
  { label: "CARTON ROUGE", value: "-3" },
];

const defRows = [
  {
    section: 'GARDIEN',
    rules: [
      { label: 'CLEAN SHEET', value: '+5' },
      { label: 'PENALTY SAVED', value: '+4' },
      { label: 'GOAL CONCEDED', value: '-1' },
    ]
  },
  {
    section: 'DÉFENSEUR',
    rules: [
      { label: 'CLEAN SHEET', value: '+4' },
      { label: 'GOAL SCORED', value: '+6' },
      { label: 'ASSIST', value: '+3' },
    ]
  }
];

const attRows = [
  {
    section: 'MILIEU',
    rules: [
      { label: 'GOAL SCORED', value: '+5' },
      { label: 'ASSIST', value: '+3' },
      { label: 'CLEAN SHEET', value: '+1' },
    ]
  },
  {
    section: 'ATTAQUANT',
    rules: [
      { label: 'GOAL SCORED', value: '+4' },
      { label: 'ASSIST', value: '+3' },
    ]
  }
];

const rowBg = [
  'bg-[#181818]',
  'bg-[#111]',
];

const getPointColor = (val) => {
  if (val.startsWith('+')) return 'text-[#61B12C]';
  if (val.startsWith('-')) return 'text-red-500';
  return 'text-white';
};

const SectionHeader = ({ children }) => (
  <tr>
    <td colSpan={2} className="py-2 pl-4 font-bold uppercase tracking-wide" style={{color:'#61B12C', fontFamily:'Bebas Neue, Gotham SSM, sans-serif', letterSpacing:'0.05em'}}>{children}</td>
  </tr>
);

const PointsSection = () => (
  <section className="w-full mt-6 shadow-lg border border-[#353535]" style={{borderRadius:0}}>
    <div className="w-full bg-[#61B12C] px-4 py-3" style={{borderRadius:0}}>
      <h2 className="text-white text-xl font-bold tracking-wide uppercase text-center" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>COMMENT MARQUER DES POINTS</h2>
    </div>
    <Tabs.Root defaultValue="all">
      <Tabs.List className="flex bg-black" style={{borderRadius:0}}>
        {tabList.map(tab => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={`flex-1 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wide transition rounded-none focus:outline-none
              data-[state=active]:text-[#61B12C] data-[state=active]:border-b-2 data-[state=active]:border-[#61B12C] data-[state=inactive]:text-white`}
            style={{
              background: 'none',
              fontFamily: 'Gotham SSM, Bebas Neue, sans-serif',
              borderBottom: '3px solid transparent',
            }}
          >
            <span className="w-full flex justify-center items-center uppercase font-bold" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{tab.label}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value="all" className="p-0">
        <table className="w-full text-white text-xs sm:text-sm">
          <tbody>
            {allRows.map((row, i) => (
              <tr key={i} className={`${rowBg[i % 2]} transition-all`}>
                <td className="py-3 pl-4 font-bold text-white text-base text-left uppercase" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{row.label}</td>
                <td className={`py-3 pr-4 text-right font-bold text-base uppercase ${getPointColor(row.value)}`} style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tabs.Content>
      <Tabs.Content value="def" className="p-0">
        <table className="w-full text-white text-xs sm:text-sm">
          <tbody>
            {defRows.map((section, idx) => [
              <SectionHeader key={section.section}>{section.section}</SectionHeader>,
              ...section.rules.map((row, i) => (
                <tr key={row.label} className={`${rowBg[i % 2]} transition-all`}>
                  <td className="py-3 pl-4 font-bold text-white text-base text-left uppercase" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{row.label}</td>
                  <td className={`py-3 pr-4 text-right font-bold text-base uppercase ${getPointColor(row.value)}`} style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{row.value}</td>
                </tr>
              ))
            ])}
          </tbody>
        </table>
      </Tabs.Content>
      <Tabs.Content value="att" className="p-0">
        <table className="w-full text-white text-xs sm:text-sm">
          <tbody>
            {attRows.map((section, idx) => [
              <SectionHeader key={section.section}>{section.section}</SectionHeader>,
              ...section.rules.map((row, i) => (
                <tr key={row.label} className={`${rowBg[i % 2]} transition-all`}>
                  <td className="py-3 pl-4 font-bold text-white text-base text-left uppercase" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{row.label}</td>
                  <td className={`py-3 pr-4 text-right font-bold text-base uppercase ${getPointColor(row.value)}`} style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{row.value}</td>
                </tr>
              ))
            ])}
          </tbody>
        </table>
      </Tabs.Content>
    </Tabs.Root>
  </section>
);

export default PointsSection; 