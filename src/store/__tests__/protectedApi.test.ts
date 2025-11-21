import { describe, expect, it } from 'vitest';

import { protectedApi } from '../protectedApi';

describe('protectedApi', () => {
  it('should have correct reducerPath', () => {
    expect(protectedApi.reducerPath).toBe('protectedApi');
  });

  describe('endpoints', () => {
    const endpoints = protectedApi.endpoints;

    it('should have all expected endpoints', () => {
      // Me endpoints
      expect(endpoints.getMe).toBeDefined();
      expect(endpoints.updateMe).toBeDefined();
      expect(endpoints.syncMe).toBeDefined();

      // Resume endpoints
      expect(endpoints.getResumes).toBeDefined();
      expect(endpoints.getResume).toBeDefined();
      expect(endpoints.createResume).toBeDefined();
      expect(endpoints.updateResume).toBeDefined();
      expect(endpoints.deleteResume).toBeDefined();
      expect(endpoints.generateResumePDF).toBeDefined();

      // AI endpoints
      expect(endpoints.generateAbout).toBeDefined();

      // Repository endpoints
      expect(endpoints.syncRepository).toBeDefined();

      // Skill endpoints
      expect(endpoints.getSkills).toBeDefined();
      expect(endpoints.createSkill).toBeDefined();

      // Session endpoints
      expect(endpoints.getSessions).toBeDefined();
      expect(endpoints.revokeSession).toBeDefined();
    });

    describe('Me endpoints', () => {
      it('getMe should be a query endpoint', () => {
        expect(endpoints.getMe.name).toBe('getMe');
      });

      it('updateMe should be a mutation endpoint', () => {
        expect(endpoints.updateMe.name).toBe('updateMe');
      });

      it('syncMe should be a mutation endpoint', () => {
        expect(endpoints.syncMe.name).toBe('syncMe');
      });
    });

    describe('Resume endpoints', () => {
      it('getResumes should be a query endpoint', () => {
        expect(endpoints.getResumes.name).toBe('getResumes');
      });

      it('getResume should be a query endpoint', () => {
        expect(endpoints.getResume.name).toBe('getResume');
      });

      it('createResume should be a mutation endpoint', () => {
        expect(endpoints.createResume.name).toBe('createResume');
      });

      it('updateResume should be a mutation endpoint', () => {
        expect(endpoints.updateResume.name).toBe('updateResume');
      });

      it('deleteResume should be a mutation endpoint', () => {
        expect(endpoints.deleteResume.name).toBe('deleteResume');
      });

      it('generateResumePDF should be a mutation endpoint', () => {
        expect(endpoints.generateResumePDF.name).toBe('generateResumePDF');
      });
    });

    describe('AI endpoints', () => {
      it('generateAbout should be a mutation endpoint', () => {
        expect(endpoints.generateAbout.name).toBe('generateAbout');
      });
    });

    describe('Repository endpoints', () => {
      it('syncRepository should be a mutation endpoint', () => {
        expect(endpoints.syncRepository.name).toBe('syncRepository');
      });
    });

    describe('Skill endpoints', () => {
      it('getSkills should be a query endpoint', () => {
        expect(endpoints.getSkills.name).toBe('getSkills');
      });

      it('createSkill should be a mutation endpoint', () => {
        expect(endpoints.createSkill.name).toBe('createSkill');
      });
    });

    describe('Session endpoints', () => {
      it('getSessions should be a query endpoint', () => {
        expect(endpoints.getSessions.name).toBe('getSessions');
      });

      it('revokeSession should be a mutation endpoint', () => {
        expect(endpoints.revokeSession.name).toBe('revokeSession');
      });
    });
  });

  describe('hooks', () => {
    it('should export Me hooks', () => {
      expect(protectedApi.useGetMeQuery).toBeDefined();
      expect(typeof protectedApi.useGetMeQuery).toBe('function');

      expect(protectedApi.useUpdateMeMutation).toBeDefined();
      expect(typeof protectedApi.useUpdateMeMutation).toBe('function');

      expect(protectedApi.useSyncMeMutation).toBeDefined();
      expect(typeof protectedApi.useSyncMeMutation).toBe('function');
    });

    it('should export Resume hooks', () => {
      expect(protectedApi.useGetResumesQuery).toBeDefined();
      expect(typeof protectedApi.useGetResumesQuery).toBe('function');

      expect(protectedApi.useGetResumeQuery).toBeDefined();
      expect(typeof protectedApi.useGetResumeQuery).toBe('function');

      expect(protectedApi.useCreateResumeMutation).toBeDefined();
      expect(typeof protectedApi.useCreateResumeMutation).toBe('function');

      expect(protectedApi.useUpdateResumeMutation).toBeDefined();
      expect(typeof protectedApi.useUpdateResumeMutation).toBe('function');

      expect(protectedApi.useDeleteResumeMutation).toBeDefined();
      expect(typeof protectedApi.useDeleteResumeMutation).toBe('function');

      expect(protectedApi.useGenerateResumePDFMutation).toBeDefined();
      expect(typeof protectedApi.useGenerateResumePDFMutation).toBe('function');
    });

    it('should export AI hooks', () => {
      expect(protectedApi.useGenerateAboutMutation).toBeDefined();
      expect(typeof protectedApi.useGenerateAboutMutation).toBe('function');
    });

    it('should export Repository hooks', () => {
      expect(protectedApi.useSyncRepositoryMutation).toBeDefined();
      expect(typeof protectedApi.useSyncRepositoryMutation).toBe('function');
    });

    it('should export Skill hooks', () => {
      expect(protectedApi.useGetSkillsQuery).toBeDefined();
      expect(typeof protectedApi.useGetSkillsQuery).toBe('function');

      expect(protectedApi.useCreateSkillMutation).toBeDefined();
      expect(typeof protectedApi.useCreateSkillMutation).toBe('function');
    });

    it('should export Session hooks', () => {
      expect(protectedApi.useGetSessionsQuery).toBeDefined();
      expect(typeof protectedApi.useGetSessionsQuery).toBe('function');

      expect(protectedApi.useRevokeSessionMutation).toBeDefined();
      expect(typeof protectedApi.useRevokeSessionMutation).toBe('function');
    });
  });
});
